import React, { Component } from 'react';
import {GOOGLEAPI} from '../../api/google-key.js';

// code adapted from sample React demo by creator of map package
// https://github.com/dburles/meteor-google-maps-react-example/blob/master/googlemaps-react.jsx

export const PhotoMap = React.createClass({

  mixins: [ReactMeteorData],

  componentDidMount() {
    GoogleMaps.load();
    //need to load in options here as in this example:
    // GoogleMaps.load({ v: '3', key: '12345', libraries: 'geometry,places' });
  },

  getMeteorData() {
    return {
      loaded: GoogleMaps.loaded(),
      mapOptions: GoogleMaps.loaded() && this._mapOptions()
    };
  },
  _mapOptions() {
    return {
      center: new google.maps.LatLng(37.733795, -122.446747),
      zoom: 8,
      libraries: 'geometry,places',
      apiKey: GOOGLEAPI

    };
  },
  render() {
    if (this.data.loaded) {
      return <GoogleMap name="mymap" options={this.data.mapOptions} />;
    }

    return <div>Loading map...</div>;
  }
});

export const GoogleMap = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    options: React.PropTypes.object.isRequired
  },

  componentDidMount() {
    GoogleMaps.create({
      name: this.props.name,
      element: document.getElementById('map-container'),
      options: this.props.options
    });

    GoogleMaps.ready(this.props.name, function(map) {
      var marker = new google.maps.Marker({
        position: map.options.center,
        map: map.instance
      });
    });
  },

  componentWillUnmount() {
    if (GoogleMaps.maps[this.props.name]) {
      google.maps.event.clearInstanceListeners(GoogleMaps.maps[this.props.name].instance);
      delete GoogleMaps.maps[this.props.name];
    } 
  },
  render() {
    return <div className="map-container" id="map-container" style={greatPlaceStyle}></div>;
  }
});

// if (Meteor.isClient) {
//   Meteor.startup(function() {
//     return React.render(<App />, document.getElementById('root'));
//   });
// }

const K_WIDTH = 400;
const K_HEIGHT = 400;

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  // position: 'absolute',
  width: window.innerWidth,
  height: window.innerHeight,
  left: 0,
  top: 0,

  
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4
};

export {greatPlaceStyle};
