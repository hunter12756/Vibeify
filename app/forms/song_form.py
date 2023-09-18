from flask_wtf import FlaskForm
from flask_wtf.file import FileField,FileAllowed,FileRequired
from wtforms import StringField,SubmitField
from wtforms.validators import DataRequired, Length
from app.api.aws import ALLOWED_EXTENSIONS
class SongForm(FlaskForm):
    title = StringField('Title',validators=[DataRequired(),Length(min=10,max=120)])
    song_file = FileField('SongFile',validators=[FileRequired(),FileAllowed(list(ALLOWED_EXTENSIONS))])
    cover_img = FileField('CoverImage',validators=[FileRequired(),FileAllowed(list({"png","jpg","jpeg"}))])
    submit= SubmitField('Submit')
