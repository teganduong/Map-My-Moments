import React, { Component } from 'react';
import { render } from 'react-dom';
import { NewsFeedEntry } from './NewsFeedEntry';


export class NewsFeed extends Component {
  render() {
    var content;
    // Loop through all the posts
    if (this.props.posts.length > 0) {
      content = this.props.posts.map(function(post, i) {
        return <NewsFeedEntry post={post} key={i}/>
      })
    } else {
      content = <NewsFeedEntry post="No content Available!" />
    }

    return (
      <div className="row">
        <h3 className="col s12 center white-text">Status Feed</h3>
        {content}
      </div>
    )
  }
}




