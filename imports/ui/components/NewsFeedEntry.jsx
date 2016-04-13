import React, { Component } from 'react';
import { render } from 'react-dom';
import { Grid, Row, Col, Button, Thumbnail } from 'react-bootstrap';


export class NewsFeedEntry extends Component {

  render() {
    return (
      <Grid>
        <Row>
        <Col xs={6} md={4}>
          <Thumbnail src={this.props.post.url}>
            <h3>{this.props.post.title}</h3>
            <p>Description</p>
            <p>
              <Button bsStyle="primary">Like</Button>&nbsp;
            </p>
          </Thumbnail>
        </Col>
        </Row>
      </Grid>
    );
  };
}
