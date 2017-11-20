import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';

import App from '../imports/ui/App.jsx';

Meteor.subscribe('stuffs');
Meteor.subscribe('userData');

Meteor.startup(() => {
  ReactDOM.render(<App />, document.getElementById('render-target'));
});

/*
Router.map(function(){
  this.onBeforeAction(function () {
      this.subscribe('userData').wait();

      if (this.ready()) {
        if (!Meteor.user()) {
          this.render('login');
        } else {
          this.next();
        }
      }
      else {
        this.render('wait');
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
*/
