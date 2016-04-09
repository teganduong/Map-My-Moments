// NewsFeed component will contain NewsFeedEntry component, 
// so that will be in this file rather than a separate file

import React, { Component } from 'react';

export class NewsFeedEntry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img className="media-object" src={post.url} />
      </div>
      <div className="media-body">
        <div onClick={() => handleNewsFeedEntryTitleClick(post)} >
          {post.title}
        </div>
      </div>
    )
  }
}

export const NewsFeed = ({posts}) => (
  <ul>
    {posts.map(post => (
      
    ))}
  </ul>  
);


