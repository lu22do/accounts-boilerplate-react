import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'; // makes history available in props

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let username = this.state.userName;
    let password = this.state.password;
    let that = this;

    Accounts.createUser({username: username, password: password}, function(err){
      if (err) {
        alert('Registration error (' + err + ')');
      }
      else {
        Meteor.loginWithPassword(username, password, function(err){
          if (err) {
            alert('Could not login');
          }
          else {
            that.props.history.push('/');
          }
        });
      }
    });
    return false;
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">Create new account</div>
          <div className="panel-body">
            <form id="register-form" action="action" onSubmit={this.handleSubmit}>

                <div className="form-group">
                  <label>User name</label>
                  <input className="form-control" type="text" name="userName"
                    value={this.state.userName}
                    onChange={this.handleInputChange} />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input className="form-control" type="password" name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange} />
                </div>

                <input className="btn btn-default" type="submit" value="Register"/>

            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Register);
