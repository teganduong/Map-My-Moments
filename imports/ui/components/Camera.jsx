import React, { Component } from 'react';
import Blaze from 'meteor/gadicc:blaze-react-component';
import '../../slingshot.js';
var uploader = new Slingshot.Upload("myFileUploads");
 
// Camera component - represents the camera view
export class Camera extends Component {
  constructor() {
    super();
    this.state = {
      pictureURL: '',
      pictureBlob: null,
    };
    // this.takePicture();
  }

  takePicture() {
    var self = this;
    
    MeteorCamera.getPicture({}, function(error, data) {
      if (data) {
        var [blob, url] = self.b64Data2Blob(data);
        self.setState({
          pictureBlob: blob,
          pictureURL: url,
        });
      }
    });
  }

  b64Data2Blob(encodedData) {
    var contentType = encodedData.match(/^data:([\w]+\/[\w]+);base64,/);
    var encodedData = encodedData.replace(/^data:image\/jpeg;base64,/, '');
    var blob = this.b64toBlobHelper(encodedData, contentType[1]);
    var blobURL = URL.createObjectURL(blob);
    return [blob, blobURL];
  }  

  /* Helper code to convert base64 encoded data to usable blob from stackoverflow
   * http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript */
  b64toBlobHelper(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }
    
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  uploadPicture() {
    // console.log(this.state.pictureURL);
    uploader.send(this.state.pictureBlob, function(error, downloadUrl) {
      // Get location otherwise use 0 & 0 for place holder
      var point = Geolocation.currentLocation() || { coords: { longitude: 0, latitude: 0 } };
      Meteor.call('posts.insert', downloadUrl, point.coords.longitude, point.coords.latitude, function(err, result) {
        console.log(err, result);
      });
    });
  }

  /* Raw picture data doesn't render properly with React on mobile.       *
   * Use Blaze to render the raw data for now with CameraHelper template. */
  render() {
    var myImage = null;

    if (this.state.pictureURL) {
      myImage = (<img src={this.state.pictureURL} />);
    }

    return (
      <div className="container">
        <h1>Post a moment</h1>
        {myImage}
        <div>
          <button className="primary" onClick={this.takePicture.bind(this)}>Take Picture</button>
          <button className="primary" onClick={this.uploadPicture.bind(this) }>Post Photo</button>
        </div>
      </div>
    );
  }
}
