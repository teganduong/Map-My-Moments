import React, { Component } from 'react';
import { render } from 'react-dom';
import { NewsFeedEntry } from './NewsFeedEntry';
import { dummyData } from '../../api/dummyData.js';


export class NewsFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    }
  }

  renderPosts() {
    var filteredPosts;
    // Get current location first then call posts.nearby
    var point = Geolocation.currentLocation() || { coords: { longitude: 0, latitude: 0 } };
    Meteor.call('posts.nearby', point.coords.longitude,
      point.coords.latitude, 300, 10,
      function(err, result) {
        // result is an array of post objects
        console.log(err, result);
        filteredPosts = result;
      }
    );
    return filteredPosts.map((post) => {
      return (
        <NewsFeedEntry
          key={post._id}
          post={post}
        />
      );
    });
  }

  render() {
  
    // Loop through all the posts
    var content = this.state.posts.map(function(post, i) {
      return <NewsFeedEntry post={post} key={i}/>
    });

    return (
      <div>
        <h2> News Feed</h2>
        {content}
      </div>
    )
  }
}




