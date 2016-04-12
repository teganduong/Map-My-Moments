// NewsFeed component will contain NewsFeedEntry component, 
// so that will be in this file rather than a separate file

import React, { Component } from 'react';
import { render } from 'react-dom';

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
    );
  }
}

export class NewsFeed extends Component {
  render() {
    var content
    // Loop through all the items
    if (this.props.items.length > 0) {
      content = this.props.items.map(function(item, i) {
        return <FeedItem item={item} key={i}/>
      })
    } else {
      content = <FeedItem item="No content Available!" />
    }

    return (
        <div className="row">
            <h3 className="col s12 center white-text">Status Feed</h3>
            {content}
        </div>
    )
  }
}




