import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Blaze from 'meteor/gadicc:blaze-react-component';
 
// Camera component - represents the camera view
export default class Camera extends Component {
  constructor() {
    super();
    this.state = {
      srcPicture: '',
    };
  }

  takePicture() {
    var self = this;
    MeteorCamera.getPicture({}, function(error, data) {
      //TODO: Upload the raw data to server
      // Session.set('photo', data);
      if (data) {
        self.setState({
          srcPicture: data,
        });
      }
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Post a moment</h1>
        <span dangerouslySetInnerHTML={{ __html: '<img src="' + this.state.srcPicture + '"/>' }}/>
        <Button bsStyle="primary" onClick={this.takePicture.bind(this)}>Take Picture</Button>
      </div>
    );
  }
}