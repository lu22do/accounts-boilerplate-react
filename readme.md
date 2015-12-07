This is a meteor boilerplate for an app manipulating some data (a collection of 'stuffs') and protected by accounts using a user name for login. There is a concept of 'admin' account who can see and administer the users (and any stuff data).

Login is required to use the app.
Only owner can delete/edit his own stuff.

Templates:
- Main
- Topbar
- Auth
    - Login 
    - Register
- Stuffs
    - Stuff list
- Users
    - User list

This project was created by adding:
- accounts-base
- accounts-password
- iron:router (+ ejson)
- twbs:bootstrap

Todo:
- Create admin account automatically
- Stuff attribute 1 & 2 
- Stuff edit screen

