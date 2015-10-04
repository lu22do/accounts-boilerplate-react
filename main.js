Stuffs = new Mongo.Collection('stuff');

if (Meteor.isClient) {
  Template.stuffs.helpers({
    stuffs: function() {
      return Stuffs.find({});
    },
    stuffCount: function() {
      return Stuffs.find({}).count();
    }
  });

  Template.topbar.events({
    'click #main': function() {
      Router.go('/');
    },
    'click #newstuff': function() {
      Router.go('/newstuff');
    },
    'click #users': function() {
      Router.go('/users');
    },
    'click #stuffs': function() {
      Router.go('/stuffs');
    },
    'click #logout': function() {
      Meteor.logout(function() {
        Router.go('/');
      })
    }
  });

  Template.newstuff.events({

  });

  Template.users.helpers();

  Template.register.helpers();

  Template.register.events();

}

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

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
