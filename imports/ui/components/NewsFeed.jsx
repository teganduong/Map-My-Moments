import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { NewsFeedEntry } from './NewsFeedEntry';
import { createContainer } from 'meteor/react-meteor-data';

export class NewsFeed extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps() {
    // This will trigger when new post added to database
    NewsFeed.posts = this.props.posts;
  }

  render() {
    const { posts } = this.props;
    return (
      <div className="newsfeed-container">
        <h2> News Feed </h2>
        {posts.map(post => (
          <NewsFeedEntry
            key={post._id}
            post={post}
          />
        ))}
      </div>
    );
  }
}