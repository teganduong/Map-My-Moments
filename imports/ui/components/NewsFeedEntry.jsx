import React, { Component } from 'react';
import { Thumbnail } from 'react-bootstrap';


export class NewsFeedEntry extends Component {
  constructor(props) {
    super(props);


  render() {
    const { post } = this.props;

    return (
      <Grid>
        <Row>
        <Col xs={6} md={4}>
          <Thumbnail src="https://s-media-cache-ak0.pinimg.com/736x/35/4c/de/354cdedfdf6c9f68ee669d79146fc50c.jpg" alt="242x200">
            <h3>Thumbnail label</h3>
            <p>Description</p>
            <p>
              <Button bsStyle="primary">Like</Button>&nbsp;
            </p>
          </Thumbnail>
        </Col>
        </Row>
      </Grid>
    );
  }
}

NewsFeedEntry.propTypes = {
  post: React.PropTypes.object,
  onEditingChange: React.PropTypes.func,
};

