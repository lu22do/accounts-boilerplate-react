import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';

import Stuffs from '../../lib/globals';
import StuffEntry from './StuffEntry.jsx'

class EditStuff extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let name = this.stuffEntry.state.name;
    let attribute = this.stuffEntry.state.attribute;
    let that = this;

    Stuffs.update(this.props.stuff._id,
                  {$set: {name: name,
                          attribute: attribute}}, function(err, _id) {
      if (err) {
        alert('Unexpected error updating this stuff (' + err + ')!')
      }
      else {
        that.props.history.push('/stuff-list');
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && !nextProps.loaded) {
      this.setState({
        loaded: true,
        name: nextProps.stuff.name,
        attribute: nextProps.stuff.attribute
      });
    }
  }

  render() {
    if (this.props.loading) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    return (
      <StuffEntry title="Edit a stuff:" stuff={this.props.stuff} handleSubmit={this.handleSubmit}
        ref={(stuffEntry) => {this.stuffEntry = stuffEntry}} submitTitle="Update" hasCancelButton />
    );
  }
}

export default withRouter(withTracker(props => {
  const handle = Meteor.subscribe('stuffs');
  const loading = !handle.ready();
  const stuff = Stuffs.findOne(props.match.params.id);

  return {
    loading,
    stuff
  };
})(EditStuff));
