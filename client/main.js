Meteor.subscribe('stuffs');
Meteor.subscribe("userData");

Router.map(function(){
  this.onBeforeAction(function () {
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

  this.route('/', function() {
    this.render('main');
  });

  this.route('/stuffs', function () {
    this.render('stuffs');
  });

  this.route('/newstuff');

  this.route('/editstuff/:_id', {
    template: 'editstuff',
    data: function(){
      return Stuffs.findOne(this.params._id);
    }
  });

  this.route('/users');

  this.route('/register');
});


 