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
      <h3 className='text-center'>Map My Moments</h3>
      <hr />
      <Row>
      <Col xs={12} md={4}  style={contentStyle}>
       {content}
      </Col>
      <div>
        <NavBar />
      </div>
      </Row>
    </Grid>
);
