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

  Template.login.events({
    'submit #login-form': function(e, t) {
      e.preventDefault();
      var username = t.find('#user-name').value;
      var password = t.find('#password').value;
      Meteor.loginWithPassword(username, password, function(err){
        if (err) {
          alert('Could not login');
        }
        else {
          Router.go('/');
        }
      });
      return false;
    }
  });

  Template.register.events({
    'submit #register-form': function(e, t) {
      e.preventDefault();
      var username = t.find('#user-name').value;
      var password = t.find('#password').value;
      Accounts.createUser({username: username, password: password}, function(err){
        if (err) {
          alert('Registration error');
          Router.go('/');
        }
        else {
          Router.go('/');
        }
      });
      return false;
    }
  });

  Template.users.helpers({
    users: function () {
      return Meteor.users.find({});      
    }
  });

  Template.users.events({
    'click #delete-user': function(e) {
      //alert('delete ' + e.target.getAttribute('data-id'));
      var username = e.target.getAttribute('data-id');
      var user = Meteor.users.findOne({username: username});
      if (user) {
        Meteor.users.remove({_id: user._id}, function(err) {
          if (err) {
            alert('could not delete');
          }
        });
      }
    }
  });

  Template.newstuff.events({
    'submit #newstuff-form': function(e, t) {
      e.preventDefault();
      var name = t.find('#name').value;
      if (!Stuffs.find({name: name}).count()) {
        Stuffs.insert({name: name}, function(err, _id) {
          if (err) {
            alert('Unexpected error')
            Router.go('/');
          } 
          else {
            Router.go('/');
          }
        });
      }
      else {
        alert('This game already exists')
        t.reset();
      }
      return false;
    }
  });

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
