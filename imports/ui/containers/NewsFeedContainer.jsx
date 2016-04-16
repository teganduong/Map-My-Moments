import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { NewsFeed } from '../components/NewsFeed';

export const NewsFeedContainer = React.createClass({

  mixins: [ReactMeteorData],

  getInitialState: function() {
      return {
        posts: []
      };
  },

  componentDidMount() {
    this.onPostsUpdate();
  },

  onPostsUpdate: function(newPosts) {
    this.setState({posts: newPosts});
  },

  getMeteorData() {
    var self = this;
    var currentLoc = Geolocation.latLng();

    if(currentLoc) {
      var options = {
        center: currentLoc,
        maxRecords: 10,
        radius: 300
      };
      
      Meteor.call('posts.nearby', currentLoc.lng, currentLoc.lat, 300, 10,
        function(err, result) {
        if (err) { throw new Error ('Problem retrieving posts from database')}
        //use the onPostsUpdate method to update the state so newsfeed can update reactively
        self.onPostsUpdate(result);
      });

      var handle = Meteor.subscribe('posts.nearbyPub', options);

      if( handle.ready() ) {
        Meteor.call('posts.nearby', options.center.lng, options.center.lat, options.radius, options.maxRecords,
          function(err, result) {
          if (err) { throw new Error ('Problem retrieving posts from database')}
          self.onPostsUpdate(result);
        });
      }
    }

    return {
      options: options,
      posts: this.state.posts
    }
  },

  render() {
    if (this.data.posts) {   
      return <NewsFeed options={this.data.options} posts={this.state.posts}/>;
    }   
    return <div>Loading News Feed...</div>;
  }

});