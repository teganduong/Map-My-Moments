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




