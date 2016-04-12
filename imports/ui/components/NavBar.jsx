import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      loggedIn: false,
    }
  }



  render() {
    var signInButton;
    if(Meteor.user()){
      signInButton = <li><a href='/logout'>Log Out</a></li>
    } else {
      signInButton = <li><a href='/signin'>Sign In!</a></li>
    }
    return (


      <nav className='navbar navbar-light'>
        <div className='container-fluid'>
          <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
            <ul className='nav navbar-nav'>
              <li>
                <a href='/camera'>Camera</a></li>
              <li>
                <a href='/'>NewsFeed</a>
              </li>
              <li>
                <a href='/map'>Map</a>
              </li>
              <li>
                <a href='/photo/:_id'>PhotoViewer </a>
              </li>
              {signInButton}
            </ul>
          </div>
        </div>
      </nav>
    )
  }   
}

