import React, {Component} from 'react';
import { NavBar } from './components/NavBar.jsx'
import { Grid, Row, Col, Button, Thumbnail } from 'react-bootstrap';
/* add padding to the bottom of the content div *
 * so the navbar doesn't overlap the content    */
var contentStyle = {
  paddingBottom: '65px'
};

// define and export our Layout component
export const Layout = ({content}) => (
    <Grid>
  <div>
    <h3 className='text-center'><div className='logoDiv'><img className='logo' src='/assets/MMMMiniLogo.png'></img></div></h3>
    <hr />
    <div className='row row-centered'>
      <div className='col-lg-4 text-center col-centered' style={contentStyle}>
        {content}
      </div>
      <div>
        <NavBar />
      </div>
      </Row>
    </Grid>
);
