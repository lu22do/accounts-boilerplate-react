import React, { Component } from 'react';
import Stuffs from '../../lib/globals';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

class StuffList extends Component {
  deleteStuff(e) {
    e.preventDefault();
    let id = e.target.getAttribute('data-id');
    Stuffs.remove(id, function(err) {
      if (err) {
        alert('Could not delete');
      }
    });
  }

  renderStuffs() {
    return this.props.stuffs().map((stuff) => (
      <tr key={stuff.id}>
        <td>{stuff.name}</td>
        <td>{stuff.attribute}</td>
        <td>{stuff.ownername}</td>
        <td>{stuff.created}</td>
        <td>
          {stuff.isMyStuff &&
            <div>
              <Link to={`/edit-stuff/${stuff.id}`}>Edit</Link> /&nbsp;
              <a onClick={this.deleteStuff} data-id={stuff.id} href="">Delete</a>
            </div>
          }
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <div className="container">
        {this.props.stuffCount ? (
          <div>
            <h1>Stuffs:</h1>
            <table className="table table-striped">
              <thead>
              <tr>
                <th>Name</th>
                <th>Attribute</th>
                <th>Owner</th>
                <th>Creation date</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
                {this.renderStuffs()}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
          No stuffs found
          </div>
       )}
      </div>
    )
  }
}

export default withTracker(props => {
  const stuffs = function() {
    return Stuffs.find({}).map(function(stuff) {
      var user = Meteor.users.findOne(stuff.owner);

      var isMyStuff = false;
      if (Meteor.userId() === stuff.owner ||
          (Meteor.user() && Meteor.user().username === 'admin')) {
        isMyStuff = true;
      }

      return {name: stuff.name,
              attribute: stuff.attribute,
              created: moment(stuff.created).calendar(),
              id: stuff._id,
              ownername: user ? user.username : "unknown",
              isMyStuff: isMyStuff};
    });
  };
  const stuffCount = Stuffs.find({}).count();

  return {
    stuffs,
    stuffCount
  };
})(StuffList);
