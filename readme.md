This is a meteor boilerplate for an app manipulating some data (a collection of 'stuffs' defined by a schemas) and protected by accounts using a user name for login. 

Regarding account management, there is a concept of 'admin' account who can see and administer the users (and any stuff data).
Login is required to use the app and only owner can delete/edit his own stuff. The Admin password can be set in the settings.json file.

The templates (in blaze) are the following:
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
- accounts-base & accounts-password
- iron:router
- twbs:bootstrap
- momentjs:moment
- aldeed:simple-schema & aldeed:collection2
