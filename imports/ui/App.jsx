import React, {Component} from 'react';
import { NavBar } from './components/NavBar.jsx'

/* add padding to the bottom of the content div *
 * so the navbar doesn't overlap the content    */
var contentStyle = {
  paddingBottom: '65px'
};

// define and export our Layout component
export const Layout = ({content}) => (
  <div>
    <h3 className='text-center'>Map My Moments</h3>
    <hr />
    <div className='row row-centered'>
      <div className='col-lg-4 text-center col-centered' style={contentStyle}>
        {content}
      </div>
      <div>
        <NavBar />
      </div>
    </div>
  </div>
);
