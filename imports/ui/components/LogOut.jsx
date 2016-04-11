import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';

export class Logout extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loggedIn: null,
      };
    }

    handleClick() {
      Meteor.logout();
    }

    render() {
      return (

        <div>
        Are you sure you want to log out?
        <br />
        <a onClick={this.handleClick()} href='/signin'>Yeah, do it.</a>
        </div>


      )
    }
}