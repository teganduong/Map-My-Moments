import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { NewsFeed } from '../components/NewsFeed';

// export const NewsFeedContainer = React.createClass({
//   mixins: [ReactMeteorData],

//   getMeteorData() {
//     var currentLocation = Geolocation.latLng();
//     if (handle.ready()) {
//       data.posts = // TODO
//     }
//     return {
//       newsFeedLoading: !handle.ready()
//     }
//   },
//   render() {
//     if (this.data.newsFeedLoading) {
//       return 'News Feed is loading..';
//     }
//     return (
//       <NewsFeed 
//     );
//   }
// });

// FeedData handles all data subscriptions and pushes data down to
// children via props.
//
// This component is a container or 'view controller' and will gather
// any data needed from the domain objects and handle subscriptions
//
// In a future version the children will be able to specify what fields
// they need, however currently they're stored in this component.

/*global FeedList, ReactMeteorData, FeedDomain */

this.FeedContainer = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      recordCount: {
        posts: 10
      },

      // TODO have this component grab children's needed fields
      // from their statics object
      fieldsNeeded: {
        posts: {
          _id: true,
          caption: true,
          likes: true,
          username: true,
          createdAt: true,
          owner: true,
        }
      }
    };
  },

  // subscribe to a reactive stream of data from
  // publication at:  imports/api/posts.js
  startMeteorSubscriptions() {
    var fields = this.state.fieldsNeeded;
    var postIds = this.data.postIds;
    var recordCount = this.state.recordCount;
    return Meteor.subscribe("posts", fields, recordCount, postIds);
  },

  // re-renders view if any reactive data source changes. `sub` is reactive
  // and will change when any new data is availible from subscription.
  getMeteorData: function() {
    var sub = this.startMeteorSubscriptions();
    var currentLoc = Geolocation.latLng();

    return {
      feedReady: sub.ready(),
      postItems: Meteor.call('posts.nearby', currentLoc.lng, currentLoc.lat, 200, 10)
    };
  },

  // pass this down to children so they can increase the limit when needed
  incrementLimit() {
    var limits = _.extend({}, this.state.recordCount);
    limits.posts = limits.posts + 5;

    this.setState({recordCount: limits});
    return this.state;
  },

  render() {
    return <NewsFeed
      incrementLimit={this.incrementLimit}
      postItems={this.data.postItems}
    />;
  }
});