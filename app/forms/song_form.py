from flask_wtf import FlaskForm
from wtforms import StringField,SubmitField
from wtforms.validators import DataRequired, Length

class SongForm(FlaskForm):
    title = StringField('Title',validators=[DataRequired(),Length(max=120)])
    song_file = StringField('Song_file',validators=[DataRequired()])

    submit= SubmitField('Submit')
