from flask_wtf import FlaskForm
from wtforms import StringField,SubmitField
from wtforms.validators import DataRequired, Length

class ArtistForm(FlaskForm):
    name = StringField('Name',validators=[DataRequired(),Length(max=120)])
    bio = StringField('Bio',validators=[DataRequired(),Length(max=255)])
    profile_picture = StringField("ProfilePicture",validators=[DataRequired()])

    submit= SubmitField('Submit')
