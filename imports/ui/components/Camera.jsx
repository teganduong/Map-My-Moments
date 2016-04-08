import React, { Component } from 'react';
import Blaze from 'meteor/gadicc:blaze-react-component';
import './CameraHelper';
 
// Camera component - represents the camera view
export class Camera extends Component {
  constructor() {
    super();
    this.takePicture();
  }

  takePicture() {
    var self = this;
    MeteorCamera.getPicture({}, function(error, data) {
      //TODO: Upload the raw data to server
      // Session.set('photo', data);
      if (data) {
        self.setState({
          srcPicture: Session.set('photo', data),
        });
        //hack to force component to rerender after getting new pic
        self.forceUpdate();
      }
    });
  }

  /* Raw picture data doesn't render properly with React on mobile.       *
   * Use Blaze to render the raw data for now with CameraHelper template. */
  render() {
    return (
      <div className="container">
        <h1>Post a moment</h1>
        <Blaze template="imageSrc" />
        <button className="primary" onClick={this.takePicture.bind(this)}>Take Picture</button>
      </div>
    );
  }
}
