import React, { Component } from 'react';
import { render } from 'react-dom';
import { NewsFeedEntry } from './NewsFeedEntry';
import { dummyData } from '../../api/dummyData.js';


export class NewsFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: dummyData
    }
  }

  render() {
    var content;
    // Loop through all the posts
    console.log('=============>>>', this.state.posts);
    if (this.state.posts.length > 0) {
      content = this.state.posts.map(function(post, i) {
        return <NewsFeedEntry post={post} key={i}/>
      })
    } else {
      content = <NewsFeedEntry post="No content Available!" />
    }

    return (
      <div className="row">
        <h3 className="col s12 center">Status Feed</h3>
        {content}
      </div>
    )
  }
}




