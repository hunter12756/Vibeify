import json
from flask_login import login_required,current_user
from flask import Blueprint, jsonify,request
from app.forms import ArtistForm
from app.models import db, Artist,Song,User
from app.api.aws import (upload_file_to_s3_artist_img, get_unique_filename)
artist_routes = Blueprint('artists',__name__)

@artist_routes.route('/')
def all_artists():
    artists = Artist.query.all()
    return json.dumps({'artists':[artist.to_dict() for artist in artists]})

@artist_routes.route('/check-artist')
def artist_page_exists():
    user = current_user  # Get the current logged-in user
    return json.dumps({'exists': user.artist_user is not None})


@artist_routes.route('/<int:id>')
def one_artist(id):
    artist = Artist.query.get(id)
    artist_songs = [Song.query.filter_by(artist_id=id).all()]
    artist_dict = artist.to_dict()
    artist_dict['songs']:artist_songs

    if not artist:
        return jsonify({'message':'no artist with that id'}), 404

    return json.dumps({'artist':artist_dict})

#create new artist
@artist_routes.route('/create',methods=['POST'])
@login_required
def create_artist():

    form = ArtistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # if form.validate_on_submit():
    artist_img = request.files.get('profile_picture')
    upload = upload_file_to_s3_artist_img(artist_img)
    if 'url' not in upload:
        return upload

    new_artist = Artist(
        name=request.form.get('name'),
        bio=request.form.get('bio'),
        profile_picture=upload['url'],
        user_id = request.form.get('user_id')
    )
    db.session.add(new_artist)
    db.session.commit()

    return new_artist.to_dict(),201

# if form.errors:
#     return form.errors

#update artist
@artist_routes.route('/<int:id>',methods=['PUT'])
@login_required
def update_artist(id):
    artist = Artist.query.get(id)
    if not artist:
        return jsonify({'message':'Artist not found'}),404

    form = ArtistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        name = request.form.get('name')
        bio = request.form.get('bio')
        profile_pic = request.files.get('profile_pic')
        artist.name = name
        artist.bio = bio

        if profile_pic:
            upload = upload_file_to_s3_artist_img(profile_pic)
            artist.profile_picture = upload['url']


        db.session.commit()

        return artist.to_dict(),201
    if form.errors:
        return form.errors

@artist_routes.route('/<int:id>',methods=['DELETE'])
@login_required
def delete_artist(id):
    artist = Artist.query.get(id)
    if not artist:
        return jsonify({'message':'Artist not found'}),404

    if artist:
        db.session.delete(artist)
        db.session.commit()
    if artist==None:
        return {'message':'Artist deleted successfully'}
    return json.dumps([[{'message':'Artist not found'}]]),404
