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

  getMeteorData() {
    var self = this;
    var currentLoc = Geolocation.latLng();

    if(currentLoc) {
      var options = {
        center: currentLoc,
        maxRecords: 20,
        radius: 300
      };
    }

    return {
      options: this.data.options,
      posts: this.state.posts,
      currentLoc: currentLoc
    }
  },

  setPosts() {
    var self = this;
    if (this.data.currentLoc) {
      Meteor.call('posts.nearby', this.data.currentLoc.lng, this.data.currentLoc.lat, 300, 20,
        function(err, result) {
        if (err) { throw new Error('Problem retrieving posts from database');}
        // once component is mounted, update the newsfeed with data retrieved from database
        else if (self.isMounted()) {
          self.setState({posts: result});
        }
      });
    }
  },

  render() {
    if (this.data.posts) {   
      return <NewsFeed 
        options={this.data.options} 
        posts={this.state.posts}
        setPosts={this.setPosts}
      />;
    }   
    return <div>Loading News Feed...</div>;
  }

});