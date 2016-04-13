import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { Component } from 'react';
import { Button, Input } from 'react-bootstrap';
import { NewsFeedEntry } from './NewsFeedEntry';
import '../../slingshot.js';

var uploader = new Slingshot.Upload("myFileUploads");
 
// Camera component - represents the camera view
export class Camera extends Component {
  constructor() {
    super();
    this.state = {
      pictureURL: '/assets/placeholder.jpg'
    };
    this.blob = null;
    this.caption = '';
  }

  componentDidMount() {
    this.takePicture();
  }  

  takePicture() {
    var self = this;
    
    MeteorCamera.getPicture({}, function(error, data) {
      if (data) {
        var [blob, url] = self.b64Data2Blob(data);
        self.setState({
          pictureURL: url
        });
        self.blob = blob;
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
    var self = this;
    uploader.send(this.blob, function(error, downloadUrl) {
      // Get location otherwise use 0 & 0 for place holder
      var point = Geolocation.currentLocation() || { coords: { longitude: 0, latitude: 0 } };
      Meteor.call('posts.insert', downloadUrl, self.caption, point.coords.longitude, point.coords.latitude, function(err, result) {
        // Show success message to user and redirect to newsfeed later
        console.log(err, result);
        FlowRouter.go('/');
      });
    });
  }

  captionChange(evt) {
    /* store the caption text */
    this.caption = evt.target.value;
  }  

  render() {
    var post = {
      title: (<Input type="text" placeholder="Caption" onChange={this.captionChange.bind(this)} />),
      url: this.state.pictureURL,
    };
    return (
      <div>
        <NewsFeedEntry post={post} />
        <Button onClick={this.takePicture.bind(this)}>Take Picture</Button>
        <Button onClick={this.uploadPicture.bind(this)}>Post Photo</Button>
      </div>
    );
  }

}
