
Router.route('/', function() {
  if (!Meteor.userId()) {
    this.render('login');
  }
  else {
    this.render('main');
  }
});

Router.route('/stuffs');
Router.route('/newstuff');
Router.route('/users');
Router.route('/register');

