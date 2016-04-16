import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Signin } from '../Signin';



export class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null,
    };
  }

  handleClick() {
    Meteor.logout();
    FlowRouter.go('Signin')
  }

  render() {
    return (
      <div>
        Are you sure you want to log out?
        <br />
        <button onClick={this.handleClick}>Yeah, do it.</button>
      </div>
    )
  }
}