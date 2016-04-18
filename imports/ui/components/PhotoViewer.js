import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { NewsFeedEntry } from './NewsFeedEntry';

export class PhotoViewer extends Component {
  constructor(props) {
    super(props);
    var self = this;
    this.state = {
      post: null,
    };
    Meteor.call('posts.getPostByID', props.photoId, function(err, result) {
      self.setState({ post: result });
    });
  }

  render() {
    var content = null;
    if (this.state.post) {
      content = (<NewsFeedEntry key={this.state.post._id} post={this.state.post} />);
    }
    return (
      <div className="newsfeed-container">
        {content}
      </div>
    );
  }
}