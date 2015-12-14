Template.users.helpers({
  users: function () {
    return Meteor.users.find({});      
  },
  isNotAdmin: function() {
    return this.username != 'admin';
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