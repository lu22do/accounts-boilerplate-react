Template.topbar.helpers({
  stuffsactive: function() {    
    return Router.current().route.getName() === 'stuffs' ? 'active' : '';
  }, 
  newstuffactive: function() {    
    return Router.current().route.getName() === 'newstuff' ? 'active' : '';
  },  
  usersactive: function() {    
    return Router.current().route.getName() === 'users' ? 'active' : '';
  },
  isAdmin: function() {
    return Meteor.user() && Meteor.user().username === 'admin';
  }  
});

Template.topbar.events({
  'click #logout': function() {
    Meteor.logout(function() {
      Router.go('/');
    })
  }
});
