import React, {Component} from 'react';
import { NavBar } from './components/NavBar.jsx'
import { NewsFeed } from './components/NewsFeed'

/* add padding to the bottom of the content div *
 * so the navbar doesn't overlap the content    */
var contentStyle = {
  paddingBottom: '65px'
};

// define and export our Layout component
export const Layout = ({content}) => (
  <div>
    <h1>My App</h1>
    <hr />
    <div style={contentStyle}>
      {content}
    </div>
    <div>
        <h3 className='text-center'>Map My Moments</h3>
        <hr />
        <div className='row row-centered'>
        <div className='col-lg-4 text-center col-centered'>{content}</div>
        <div><NavBar /></div>
        </div>
    </div>
  </div>
);
