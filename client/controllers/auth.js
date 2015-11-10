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