Template.stuffs.helpers({
  stuffs: function() {
    return Stuffs.find({});
  },
  stuffCount: function() {
    return Stuffs.find({}).count();
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