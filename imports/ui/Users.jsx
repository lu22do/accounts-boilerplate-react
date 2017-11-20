import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

class Users extends Component {
  handleDelete(e) {
    e.preventDefault();
    let id = e.target.getAttribute('data-id');
    Meteor.users.remove({_id: id}, function(err) {
      if (err) {
        alert('Could not delete');
      }
    });
  }

  renderUsers() {
    return this.props.users.map((user) => (
      <tr key={user._id}>
        <td>{user.username}</td>
        <td>
          {user.username != 'admin' && Meteor.user().username == 'admin' &&
            <a onClick={this.handleDelete.bind(this)} data-id={user._id} href="">Delete</a>
          }
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <div className="container">
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.renderUsers()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default withTracker(props => {
  return {
    users: Meteor.users.find().fetch()
  };
})(Users);
