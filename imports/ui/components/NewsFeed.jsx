import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { NewsFeedEntry } from './NewsFeedEntry';
import { createContainer } from 'meteor/react-meteor-data';

export class NewsFeed extends Component {
  constructor(props) {
    super(props);
    this.getLocation();

    this.state = {
      posts: []
    };
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      renderPosts();
    });
  }

  renderPosts() {
    var self = this;
    // Get current location first then call posts.nearby
    var point = Geolocation.currentLocation() || { coords: { longitude: 0, latitude: 0 } };
    console.log('====>>POINT', point);
    Meteor.call('posts.nearby', point.coords.longitude,
      point.coords.latitude, 300, 10,
      function(err, result) {
        // result is an array of post objects
        console.log('====>', result);
        self.setState({
          posts: result
        });
      }
    );
    
  }

  render() {
    return (
      <div className="container">
        <h2> News Feed </h2>
        {this.state.posts.map((post) => {
          return (
            <NewsFeedEntry
              key={post._id}
              post={post}
            />
          );
        })}
      </div>
    );
  }
}





