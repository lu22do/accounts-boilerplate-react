import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, withRouter } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

class TopBar extends Component {
  constructor(props) {
    super(props);
  }

  handleLogout(e) {
    e.preventDefault();
    let that = this;

    Meteor.logout(function() {
      that.props.history.push('/');
    })

    return false;
  }

  render() {
    const currentUser = this.props.currentUser;
    const isAdmin = currentUser && currentUser.username === 'admin';

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>

            <Link className="navbar-brand" to="/">Brand</Link>
          </div>

          {currentUser &&
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">

                <li>
                  <NavLink to="/stuff-list" activeClassName="active">
                    <span className="glyphicon glyphicon-th-list"></span> Stuffs
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/new-stuff" activeClassName="active">
                    <span className="glyphicon glyphicon-plus"></span> Add stuff
                  </NavLink>
                </li>

                {isAdmin &&
                  <li>
                    <NavLink to="/users" activeClassName="active">
                      <span className="glyphicon glyphicon-user"></span> Users
                    </NavLink>
                  </li>
                }
              </ul>

              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="" onClick={this.handleLogout.bind(this)}>
                    <span className="glyphicon glyphicon-log-out"></span> Logout ({currentUser.username})
                  </a>
                </li>
              </ul>
            </div>
          }
        </div>
      </nav>
    )
  }
}

export default withRouter(withTracker(props => {
  return {
    currentUser: Meteor.user()
  };
})(TopBar));
