import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, Redirect } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const username = ReactDOM.findDOMNode(this.refs.userName).value.trim();
    const password = ReactDOM.findDOMNode(this.refs.password).value;

    let that = this;

    Meteor.loginWithPassword(username, password, function(err){
      if (err) {
        alert('Could not login');
      }
      else {
        that.setState({ redirectToReferrer: true })
      }
    });
    return false;
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    if (this.state.redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">Login</div>
          <div className="panel-body">
            <form id="login-form" action="action" onSubmit={this.handleSubmit}>

              <div className="form-group">
                <label>User name</label>
                <input className="form-control" type="text" ref="userName"/>
              </div>

              <div className="form-group">
                <label>Password</label>
                <input className="form-control" type="password" ref="password"/>
              </div>

              <input className="btn btn-default" type="submit" value="Sign in"/>

            </form>
          </div>
        </div>

        <div className="container">
          New? <Link to="/register">Register</Link>
        </div>
      </div>
    )
  }
}
