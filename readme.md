This is a meteor boilerplate for an app manipulating some data (a collection of 'stuffs') and protected by accounts using a user name for login. There is a concept of 'admin' account who can see and administer the users (and any stuff data).

Login is required to use the app.
Only owner can delete/edit his own stuff.
Admin password can be set in the settings.json file.

Templates:
- Main
- Topbar
- Auth
    - Login 
    - Register
- Stuffs
    - Stuff list
    - Create stuff
    - Edit stuff
- Users
    - User list

This project was created by adding:
- accounts-base
- accounts-password
- iron:router (+ ejson)
- twbs:bootstrap
