Meteor.subscribe('stuffs');
Meteor.subscribe("userData");

Router.onBeforeAction(function () {
	  if (!Meteor.userId()) {
	    this.render('Login');
	  } else {
	    this.next();
	  }
  },
  {
  	except: ['register']
  }
);

Router.route('/', function() {
  this.render('main');
});

Router.route('/stuffs');
Router.route('/newstuff');
Router.route('/users');
Router.route('/register');

 