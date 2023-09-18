import json
from flask_login import login_required
from flask import Blueprint, jsonify,request
from app.forms import SongForm
from app.models import db, Song, Artist
from app.api.aws import (upload_file_to_s3_song_img,upload_file_to_s3_song_file, get_unique_filename)
song_routes = Blueprint('songs',__name__)

@song_routes.route('/')
def all_songs():
    songs = Song.query.all()
    return json.dumps({'songs':[song.to_dict() for song in songs]})

@song_routes.route('/<int:songId>')
def one_song(songId):
    song = Song.query.get(songId)
    artist = Artist.query.get(song.artist_id)
    song_dict = song.to_dict()
    song_dict['artist'] = artist.name

    if not song:
        return jsonify({'message':'no song with that id'}), 404

    return json.dumps({'song':song_dict})

#songs from each artistId
@song_routes.route('/artists/<int:artistId>')
def artist_songs(artistId):
    songs = Song.query.filter_by(artist_id=artistId).all()
    if not songs:
        return jsonify({'message':'no song with that id'}), 404

    return json.dumps({'songs':[song.to_dict() for song in songs]})

#create new song
@song_routes.route('/create',methods=['POST'])
@login_required
def create_song():
    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        cover_img = request.files.get('cover_img')
        upload = upload_file_to_s3_song_img(cover_img)
        song_file = request.files.get('song_file')
        upload2 = upload_file_to_s3_song_file(song_file)

        if 'url' not in upload:
            return upload
        if 'url' not in upload2:
            return upload

        new_song = Song(
            title=request.form.get('title'),
            artist_id=int(request.form.get('artist_id')),
            song_file=upload2['url'],
            cover_img=upload['url'],
        )
        db.session.add(new_song)
        db.session.commit()

        return new_song.to_dict(),201
    if form.errors:
        return form.errors

#update song
@song_routes.route('/<int:id>',methods=['PUT'])
@login_required
def update_songs(id):
    song = Song.query.get(id)
    if not song:
        return jsonify({'message':'Song not found'}),404

    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        song.title = request.form.get('title'),
        song_file = request.files.get('song_file')
        cover_img = request.files.get('cover_img')
        if song_file:
            upload = upload_file_to_s3_song_file(song_file)
            song.song_file = upload['url']
        if cover_img:
            upload2= upload_file_to_s3_song_img(cover_img)
            song.cover_img = upload2['url']

        db.session.commit()

        return song.to_dict(),201
    if form.errors:
        return form.errors

@song_routes.route('/<int:id>',methods=['DELETE'])
@login_required
def delete_song(id):
    song = Song.query.get(id)
    if not song:
        return jsonify({'message':'Song not found'}),404

    if song:
        db.session.delete(song)
        db.session.commit()
    if song==None:
        return {'message':'Song deleted successfully'}
    return json.dumps([[{'message':'Song not found'}]]),404
