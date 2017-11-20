import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';
import Stuffs from '../../lib/globals';

class EditStuff extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      name: this.props.stuff ? this.props.stuff.name : '',
      attribute: this.props.stuff ? this.props.stuff.attribute : ''
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

    let name = this.state.name;
    let attribute = this.state.attribute;
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
      <div className="container">
        <h3>Update this stuff:</h3>
        <form id="edit-stuff-form" action="action" onSubmit={this.handleSubmit}>

            <div className="form-group">
              <label>Stuff name</label>
              <input className="form-control" type="text" name="name"
                value={this.state.name}
                onChange={this.handleInputChange} />
            </div>

            <div className="form-group">
              <label>Stuff attribute</label>
              <input className="form-control" type="text" name="attribute"
                value={this.state.attribute}
                onChange={this.handleInputChange} />
            </div>

            <input className="btn btn-default" type="submit" value="Update"/>&nbsp;
            <Link className="btn btn-default" to="/stuff-list">Cancel</Link>
        </form>
      </div>
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
