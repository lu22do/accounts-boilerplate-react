import React, { Component } from 'react';
import Stuffs from '../../lib/globals';
import { withRouter } from 'react-router-dom'; // makes history available in props

import StuffEntry from './StuffEntry.jsx'

class NewStuff extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let name = this.stuffEntry.state.name;
    let attribute = this.stuffEntry.state.attribute;
    let that = this;

    if (!Stuffs.find({name}).count()) {
      Stuffs.insert(
        { name,
          attribute,
          owner: Meteor.userId() },
        function(err, _id) {
          if (err) {
            alert('Unexpected error creating this stuff! (' + err + ')');
            that.props.history.push('/');
          }
          else {
            that.props.history.push('/stuff-list');
          }
        }
      );
    }
    else {
      alert('This stuff already exists! Could not create it.')
      this.setState({
        name: '',
        attribute: ''
      });
    }
    return false;
  }

  render() {
    return (
      <StuffEntry title="Create new stuff:" stuff={{name: '', attribute: ''}} handleSubmit={this.handleSubmit}
        ref={(stuffEntry) => {this.stuffEntry = stuffEntry}} submitTitle="Create" />
    );
  }
}

export default withRouter(NewStuff);
