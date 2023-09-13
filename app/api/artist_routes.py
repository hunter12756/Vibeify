import json
from flask_login import login_required
from flask import Blueprint, jsonify,request
from app.forms import ArtistForm
from app.models import db, Artist,Song
# from app.api.aws import (upload_file_to_s3, get_unique_filename)
artist_routes = Blueprint('artists',__name__)

@artist_routes.route('/')
def all_artists():
    artists = Artist.query.all()
    return json.dumps({'artists':[artist.to_dict() for artist in artists]})

@artist_routes.route('/<int:id>')
def one_artist(id):
    artist = Artist.query.get(id)
    artist_songs = [Song.query.filter_by(artist_id=id).all()]
    artist_dict = artist.to_dict()
    artist_dict['songs']:artist_songs
    if not artist:
        return jsonify({'message':'no artist with that id'}), 404

    return json.dumps({'artist':artist_dict})

#songs from each artistId
# @artist_routes.route('/artists/<int:artistId>')
# def artist_songs(artistId):
#     songs = Artist.query.filter_by(artist_id=artistId).all()
#     if not songs:
#         return jsonify({'message':'no song with that id'}), 404

#     return json.dumps({'songs':[song.to_dict() for song in songs]})

#create new artist
@artist_routes.route('/<int:id>/users/<int:userId>',methods=['POST'])
@login_required
def create_artist(userId):
    data= request.get_json()
    form = ArtistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_artist = Artist(
            name=form.data['name'],
            bio=form.data['bio'],
            profile_picture=form.data['profile_picture'],
            user_id = userId
        )
        db.session.add(new_artist)
        db.session.commit()

        return json.dumps([{'artist':new_artist.to_dict()}]),201
    if form.errors:
        return form.errors

#update artist
@artist_routes.route('/<int:id>',methods=['PUT'])
@login_required
def update_artist(id):
    artist = Artist.query.get(id)
    if not artist:
        return jsonify({'message':'Song not found'}),404

    form = ArtistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        artist.title = form.data['title'],
        artist.bio = form.data['bio'],
        artist.profile_picture = form.data['profile_picture']

        db.session.commit()

        return json.dumps([{'artist':artist.to_dict()}]),201
    if form.errors:
        return form.errors

@artist_routes.route('/<int:id>',methods=['DELETE'])
@login_required
def delete_song(id):
    artist = Artist.query.get(id)
    if not artist:
        return jsonify({'message':'Artist not found'}),404

    if artist:
        db.session.delete(artist)
        db.session.commit()
        return json.dumps([{'message':'Artist delete successfully'}])
    return json.dumps([[{'message':'Artist not found'}]]),404
