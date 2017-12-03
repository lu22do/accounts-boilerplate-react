This is a meteor/react/bootstrap boilerplate for an app manipulating some data (a collection of 'stuffs' defined by a schemas) and protected by accounts using a user name for login. It uses react-router v4.

Regarding account management, there is an 'admin' account who can see and administer the users (and any stuff data).
Login is required to use the app and only owner can delete/edit his own stuff. The Admin password can be set in the settings.json file.

The UI react components are the following:
- App
- Topbar
- Auth:
    - Login
    - Register
- Stuffs:
    - Stuff list
    - New stuff
    - Edit stuff
- Users:
    - User list

This project was created by adding the following meteor packages:
- accounts-base & accounts-password
- twbs:bootstrap
- momentjs:moment
- aldeed:simple-schema & aldeed:collection2
- react-meteor-data
and the following npm packages:
- react, react-dom, prop-types
- react-router-dom

Possible improvements:
- for error handling, use real UI component rather than alert() - actually alert() don't seem to work with react-router
- add unit test
- add a 'Stuff detail' UI component as real app would usually have more details than can be shown in 'Stuff list'
- investigate why stuff updates are not reflected dynamically (only add/remove) in list and edit views
