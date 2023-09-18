# Vibeify

Vibeify is a partial clone of the website "spotify", a music streaming and sharing site, where users can either just listen to music they find, or start uploading music as well and have their own profile. I have always loved spotify for their clean UI & UX, clean navigation, and style.

# Live Link
vibeify.onrender.com

# Stack
Python, Flask, JS, React, Redux, CSS3, HTML5
## Database
Postgress
## Hosting
Render
Landing Page


# Landing Page
![image](https://github.com/hunter12756/Vibeify/assets/36972514/f5052326-80be-4308-b3e1-154ebca6aadd)

# Song Detail
![image](https://github.com/hunter12756/Vibeify/assets/36972514/9d25ddc2-2772-43f0-9ba2-2188a4fbcf98)

# Artist Page (Owner)
![image](https://github.com/hunter12756/Vibeify/assets/36972514/d82c00c8-27c3-453c-9b15-b6d91868270d)

# Arist Page (Visiter)
![image](https://github.com/hunter12756/Vibeify/assets/36972514/413a83c7-d5c0-42aa-9403-0722c95c5ed2)

# Endpoints
## Auth
| Request                        | Purpose                | Return Value  |                  
| :----------------------------- | :--------------------: | :------------------------------ |
| GET /api/auth/        | This fetch is sent upon initial app load and on subsequent refreshes.<br>It returns an object representing the current user, if user is logged in.                                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>}<br><br>Status: 200<br>|
| POST /api/auth/unauthorized      | This endpoint will be routed to in the case that a protected route does not pass validations for the current user.<br>It returns an object with an errors property, which is an array with the value 'Unauthorized'          | {<br>&nbsp;&nbsp;&nbsp;'errors': ARRAY[STRINGS]<br>}<br><br>Status: 401<br>|
| POST /api/auth/signup        | This fetch sends the form data signup from data to the backend to process the creation of a new user.<br>It returns an object representing the current user, after logging them in, if account creation succeeds.                                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>}<br><br>Status: 200<br>|
| POST /api/auth/login | This fetch attempts to login a user with the provided credentials.<br>It returns an object representing the current user, if validation succeeds.                                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>}<br><br>Status: 200<br>|                                                                        
| POST /api/auth/logout | This fetch will logout the current user.<br>It returns an object with the message 'User logged Out' if it succeeds.                                 | {<br>&nbsp;&nbsp;&nbsp;'message': STRING<br>}<br><br>Status: 200<br>|

## Artist
| Request                        | Purpose                | Return Value  | 
| :----------------------------- | :--------------------: | :------------------------------ |
| GET /api/artists/<int:artist_id>         | This fetch is sent to retrieve one artist specified by the id. Upon success, we return an array of objects representing that data.           | ARRAY[<br>&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;apt_number: INT,<br>&nbsp;&nbsp;&nbsp;city: STRING,<br>&nbsp;&nbsp;&nbsp;company: STRING,<br>&nbsp;&nbsp;&nbsp;country: STRING,<br>&nbsp;&nbsp;&nbsp;primary: BOOLEAN,<br>&nbsp;&nbsp;&nbsp;shipping_name: STRING,<br>&nbsp;&nbsp;&nbsp;state: STRING,<br>&nbsp;&nbsp;&nbsp;street: STRING,<br>&nbsp;&nbsp;&nbsp;user_id: INT,<br>&nbsp;&nbsp;&nbsp;zip: STRING,<br>&nbsp;&nbsp;&nbsp;},<br>]<br><br>Status: 200<br>|
| POST /api/artists/create        | This fetch is sent to create a new artist profile. Upon success, it returns an object representing that item.                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'category': STRING,<br>&nbsp;&nbsp;&nbsp;'vendor_name': STRING,<br>&nbsp;&nbsp;&nbsp;'manufacturer_id': STRING,<br>&nbsp;&nbsp;&nbsp;'name': STRING,<br>&nbsp;&nbsp;&nbsp;'model': STRING,<br>&nbsp;&nbsp;&nbsp;'serial': STRING,<br>&nbsp;&nbsp;&nbsp;'description': STRING,<br>&nbsp;&nbsp;&nbsp;'tech_specs': STRING,<br>&nbsp;&nbsp;&nbsp;'price': FLOAT<br>}<br><br>Status: 201<br>|
| PUT /api/artists/<int:song_id>        | This fetch is sent to update the Artist Profile. Upon success, it returns an object representing that item in the cart, with a new quantity.                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'user_id': INT,<br>&nbsp;&nbsp;&nbsp;'item_id': INT,<br>&nbsp;&nbsp;&nbsp;'quantity': INT,<br>}<br><br>Status: 200<br>|
| DELETE /api/artists/<int:song_id>        | This fetch is sent to delete an Artist Profile. Upon success, it returns the string "Success", otherwise, we throw an error.                | "Success"<br><br>Status: 200<br>|


## Song
| Request                        | Purpose                | Return Value  | 
| :----------------------------- | :--------------------: | :------------------------------ |
| GET /api/songs/<int:song_id>         | This fetch is sent to retrieve one song specified by the id. Upon success, we return an array of objects representing that data.           | ARRAY[<br>&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;apt_number: INT,<br>&nbsp;&nbsp;&nbsp;city: STRING,<br>&nbsp;&nbsp;&nbsp;company: STRING,<br>&nbsp;&nbsp;&nbsp;country: STRING,<br>&nbsp;&nbsp;&nbsp;primary: BOOLEAN,<br>&nbsp;&nbsp;&nbsp;shipping_name: STRING,<br>&nbsp;&nbsp;&nbsp;state: STRING,<br>&nbsp;&nbsp;&nbsp;street: STRING,<br>&nbsp;&nbsp;&nbsp;user_id: INT,<br>&nbsp;&nbsp;&nbsp;zip: STRING,<br>&nbsp;&nbsp;&nbsp;},<br>]<br><br>Status: 200<br>|
| POST /api/songs/create       | This fetch is sent to add a new song. Due to the existence of the Primary property, we update the frontend store by sending back an array of all entries and replacing the value of the current state upon success.        | ARRAY[<br>&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;apt_number: INT,<br>&nbsp;&nbsp;&nbsp;city: STRING,<br>&nbsp;&nbsp;&nbsp;company: STRING,<br>&nbsp;&nbsp;&nbsp;country: STRING,<br>&nbsp;&nbsp;&nbsp;primary: BOOLEAN,<br>&nbsp;&nbsp;&nbsp;shipping_name: STRING,<br>&nbsp;&nbsp;&nbsp;state: STRING,<br>&nbsp;&nbsp;&nbsp;street: STRING,<br>&nbsp;&nbsp;&nbsp;user_id: INT,<br>&nbsp;&nbsp;&nbsp;zip: STRING,<br>&nbsp;&nbsp;&nbsp;},<br>]<br><br>Status: 201<br>|
| PUT /api/songs/<int:song_id>        | This fetch is sent to update the songs info. Upon success, we return an array of objects representing all entries for current user.           | ARRAY[<br>&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;apt_number: INT,<br>&nbsp;&nbsp;&nbsp;city: STRING,<br>&nbsp;&nbsp;&nbsp;company: STRING,<br>&nbsp;&nbsp;&nbsp;country: STRING,<br>&nbsp;&nbsp;&nbsp;primary: BOOLEAN,<br>&nbsp;&nbsp;&nbsp;shipping_name: STRING,<br>&nbsp;&nbsp;&nbsp;state: STRING,<br>&nbsp;&nbsp;&nbsp;street: STRING,<br>&nbsp;&nbsp;&nbsp;user_id: INT,<br>&nbsp;&nbsp;&nbsp;zip: STRING,<br>&nbsp;&nbsp;&nbsp;},<br>]<br><br>Status: 200<br>|
| DELETE /api/songs/<int:song_id>     | This fetch deletes a song. Upon successful deletion we return the updated array of user entries. | ARRAY[<br>&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;apt_number: INT,<br>&nbsp;&nbsp;&nbsp;city: STRING,<br>&nbsp;&nbsp;&nbsp;company: STRING,<br>&nbsp;&nbsp;&nbsp;country: STRING,<br>&nbsp;&nbsp;&nbsp;primary: BOOLEAN,<br>&nbsp;&nbsp;&nbsp;shipping_name: STRING,<br>&nbsp;&nbsp;&nbsp;state: STRING,<br>&nbsp;&nbsp;&nbsp;street: STRING,<br>&nbsp;&nbsp;&nbsp;user_id: INT,<br>&nbsp;&nbsp;&nbsp;zip: STRING,<br>&nbsp;&nbsp;&nbsp;},<br>]<br><br>Status: 200<br>|



# Feature list
1. Songs
2. Artists
3. Audio Visualizer
4. AWS

# Future Implementations
1. Search
2. Playlist
3. Liked Songs
