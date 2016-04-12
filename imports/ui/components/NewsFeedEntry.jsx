import React, { Component } from 'react';
import { render } from 'react-dom';
import { Grid, Row, Col, Button, Thumbnail } from 'react-bootstrap';


export class NewsFeedEntry extends Component {
  constructor(props) {
    super();

    this.state = {
      likes: 0
    }
  }

  incrementLikes() {
    this.setState({ likes: this.state.likes + 1 });
  }

  render() {
    return (
      <Grid>
        <Row>
        <Col xs={6} md={4}>
          <Thumbnail src={this.props.post.url}>
            <label>{this.state.likes} likes</label>
            <p>{this.props.post.username}</p>
            <h4>{this.props.post.title}</h4>
            <p>Description</p>
            <p>
              <Button bsStyle="primary" onClick={this.incrementLikes.bind(this)}>Like</Button>&nbsp;
            </p>
          </Thumbnail>
        </Col>
        </Row>
      </Grid>
    );
  };
}
