Template.topbar.events({
  'click #logout': function() {
    Meteor.logout(function() {
      Router.go('/');
    })
  }
});
