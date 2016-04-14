import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { NewsFeedEntry } from './NewsFeedEntry';
import { createContainer } from 'meteor/react-meteor-data';

export class NewsFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.renderNearbyPosts();
  }

  renderNearbyPosts() {
    var self = this;
    // Get current location of user and once position is determined,
    // call posts.nearby to populate newsfeed w/ nearby posts
    navigator.geolocation.getCurrentPosition((position) => {
      Meteor.call('posts.nearby', position.coords.longitude,
        position.coords.latitude, 300, 10,
        function(err, result) {
          // result is an array of post objects
          self.setState({
            posts: result
          });
        }
      );
    });
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





