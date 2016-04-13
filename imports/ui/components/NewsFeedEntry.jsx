import React, { Component } from 'react';
import { render } from 'react-dom';
import { Grid, Row, Col, Button, Thumbnail } from 'react-bootstrap';


export class NewsFeedEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      likes: this.props.post.likes,
      liked: false
    };
    this.toggleLike = this.toggleLike.bind(this);
    this.updateLikes = this.updateLikes.bind(this);
  }

  toggleLike() {
    this.setState({ 
      liked: !this.state.liked,
    });
    this.updateLikes();
  }

  updateLikes() {
    var likeCount = this.state.liked ? this.state.likes - 1 : this.state.likes + 1;
    this.setState({
      likes: likeCount
    });
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
              <Button bsStyle="primary" onClick={this.toggleLike}>Like</Button>&nbsp;
            </p>
          </Thumbnail>
        </Col>
        </Row>
      </Grid>
    );
  };
}
