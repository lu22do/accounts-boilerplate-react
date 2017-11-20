import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';

import TopBar from './TopBar.jsx';
import StuffList from './StuffList.jsx';
import NewStuff from './NewStuff.jsx';
import EditStuff from './EditStuff.jsx';
import Users from './Users.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';

const Welcome = () => (
  <div className="container">
    <h1>Welcome to this site built with Meteor & React!</h1>
  </div>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Meteor.userId() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <TopBar location={this.location}/>

          <PrivateRoute exact path='/' component={Welcome}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <PrivateRoute path='/stuff-list' component={StuffList}/>
          <PrivateRoute path='/new-stuff' component={NewStuff}/>
          <PrivateRoute path='/edit-stuff/:id' component={EditStuff}/>
          <PrivateRoute path='/users' component={Users}/>
        </div>
      </BrowserRouter>
    )
  }
}
