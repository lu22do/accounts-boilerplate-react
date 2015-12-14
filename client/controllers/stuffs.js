Template.stuffs.helpers({
  stuffs: function() {
    return Stuffs.find({}).map(function(stuff) {
      var user = Meteor.users.findOne(stuff.owner);

      var isMyStuff = false;
      if (Meteor.userId() === stuff.owner || (Meteor.user() && Meteor.user().username === 'admin')) {
        isMyStuff = true;
      }

      return {name: stuff.name, 
              attribute: stuff.attribute,      
              id: stuff._id,      
              ownername: user ? user.username : "unknown",
              isMyStuff: isMyStuff};
    });
  },
  stuffCount: function() {
    return Stuffs.find({}).count();
  }
});

Template.stuffs.events({
  'click #delete-stuff': function(e) {
    //alert('delete ' + e.target.getAttribute('data-id'));
    var id = e.target.getAttribute('data-id');
    Stuffs.remove(id, function(err) {
      if (err) {
        alert('Could not delete');
      }
    });
  }
});

Template.newstuff.events({
  'submit #new-stuff-form': function(e, t) {
    e.preventDefault();
    var name = t.find('#name').value;
    var attribute = t.find('#attribute').value;
    if (!Stuffs.find({name: name}).count()) {
      Stuffs.insert({name: name,
                     attribute: attribute, 
                     owner: Meteor.userId()}, function(err, _id) {
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

Template.editstuff.events({
  'submit #edit-stuff-form': function(e, t) {
    e.preventDefault();
    var id = e.target.getAttribute('data-id');
    var name = t.find('#name').value;
    var attribute = t.find('#attribute').value;
    Stuffs.update(id,
                  {$set: {name: name,
                   attribute: attribute}}, function(err, _id) {
      if (err) {
        alert('Unexpected error updating this stuff!')
        t.find('#newstuff-form').reset();
      } 
      else {
        Router.go('/stuffs');
      }
    });
    return false;
  }
});