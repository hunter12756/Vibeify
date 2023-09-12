import json
from flask_login import login_required
from flask import Blueprint, jsonify,request
from app.forms import SongForm
from app.models import db, Song
# from app.api.aws import (upload_file_to_s3, get_unique_filename)
song_routes = Blueprint('songs',__name__)

@song_routes.route('/')
def all_songs():
    songs = Song.query.all()
    return json.dumps({'songs':[song.to_dict() for song in songs]})

@song_routes.route('/<int:songId>')
def one_song(songId):
    song = Song.query.get(songId)

    if not song:
        return jsonify({'message':'no song with that id'}), 404

    return json.dumps({'song':song.to_dict()})

#songs from each artistId
@song_routes.route('/artists/<int:artistId>')
def artist_songs(artistId):
    songs = Song.query.filter_by(artist_id=artistId).all()
    if not songs:
        return jsonify({'message':'no song with that id'}), 404

    return json.dumps({'songs':[song.to_dict() for song in songs]})

#create new song
@song_routes.route('/artists/<int:artistId>',methods=['POST'])
@login_required
def create_song(artistId):
    data= request.get_json()
    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_song = Song(
            title=form.data['title'],
            artist_id=artistId,
            song_file=form.data['song_file']
        )
        db.session.add(new_song)
        db.session.commit()

        return json.dumps([{'song':new_song.to_dict()}]),201
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
        song.title = form.data['title'],
        song.song_file = form.data['song_file']

        db.session.commit()

        return json.dumps([{'song':song.to_dict()}]),201
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
        return json.dumps([{'message':'Song delete successfully'}])
    return json.dumps([[{'message':'Song not found'}]]),404
