from flask_wtf import FlaskForm
from wtforms import StringField,SubmitField
from flask_wtf.file import FileField,FileAllowed,FileRequired
from wtforms.validators import DataRequired, Length

class ArtistForm(FlaskForm):
    name = StringField('Name',validators=[DataRequired(),Length(max=120)])
    bio = StringField('Bio',validators=[DataRequired(),Length(max=255)])
    profile_picture = FileField('ProfilePic',validators=[FileRequired(),FileAllowed(list({"png","jpg",'jpeg'}))])

    submit= SubmitField('Submit')
