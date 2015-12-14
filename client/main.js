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
Router.route('/editstuff/:_id', {
	template: 'editstuff',
  data: function(){
    return Stuffs.findOne(this.params._id);
  }
});
Router.route('/users');
Router.route('/register');

 