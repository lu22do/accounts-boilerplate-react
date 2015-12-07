Template.stuffs.helpers({
  stuffs: function() {
    return Stuffs.find({}).map(function(stuff) {
      var user = Meteor.users.findOne(stuff.owner);

      var myStuff = false;
      if (Meteor.userId() === stuff.owner || (Meteor.user() && Meteor.user().username === 'admin')) {
        myStuff = true;
      }

      return {name: stuff.name, 
              ownername: user ? user.username : "error",
              myStuff: myStuff};
    });
  },
  stuffCount: function() {
    return Stuffs.find({}).count();
  }
});

Template.stuffs.events({
  'click #delete-stuff': function(e) {
    //alert('delete ' + e.target.getAttribute('data-id'));
    var name = e.target.getAttribute('data-id');
    var stuff = Stuffs.findOne({name: name});
    if (stuff) {
      Stuffs.remove({_id: stuff._id}, function(err) {
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
      Stuffs.insert({name: name, owner: Meteor.userId()}, function(err, _id) {
        if (err) {
          alert('Unexpected error creating this stuff!')
          Router.go('/');
        } 
        else {
          Router.go('/stuffs');
        }
      });
    }
    else {
      alert('This stuff already exists! Could not create it.')
      t.find('#newstuff-form').reset();
    }
    return false;
  }
});