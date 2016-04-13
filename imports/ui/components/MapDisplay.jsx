import React, { Component } from 'react';
import {GOOGLEAPI} from '../../api/google-key.js';

// code adapted from sample React demo by creator of map package
// https://github.com/dburles/meteor-google-maps-react-example/blob/master/googlemaps-react.jsx
export const MapDisplay = React.createClass({

  mixins: [ReactMeteorData],

  componentDidMount() {
    GoogleMaps.load();
  },

  getMeteorData() {
    var currentLoc = Geolocation.latLng();
    if(GoogleMaps.loaded() && currentLoc) {
      var options = {
        center: new google.maps.LatLng(currentLoc.lat, currentLoc.lng),
        zoom: MAP_ZOOM,
        libraries: 'geometry,places',
        key: GOOGLEAPI
      };

      var markers = {
        1: {
          id: 1,
          lat: 37.783406899999996, 
          lng: -122.4086548
        },
        2: {
          id: 2,
          lat: 37.983406899999996, 
          lng: -122.4086548
        }
      };
    }
    return {
      loaded: GoogleMaps.loaded(),
      mapOptions: GoogleMaps.loaded() && options,
      markers: markers
    }
  },

  render() {
    if (this.data.loaded && this.data.mapOptions) {
      return <MyMap name="mymap" options={this.data.mapOptions} markers={this.data.markers}/>;
    }
    
    return <div>Loading map...</div>;

  }
});

const MyMap = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    options: React.PropTypes.object.isRequired
  },
  
  componentDidMount() {
    // need to wait to do this create below until we have a current location
    MyMap.markers = this.props.markers;

    GoogleMaps.create({
      name: this.props.name,
      element: document.getElementById('map-container'),
      options: this.props.options
    });

    GoogleMaps.ready(this.props.name, function(map) {
      console.log('My marker:', MyMap.markers[1]);
      var marker = new google.maps.Marker({
        position: MyMap.markers[1],
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
    return <div className="map-container" id="map-container" style={mapsStyles}></div>;
  }
});

const mapsStyles = {
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

const MAP_ZOOM = 15;

export {mapsStyles};
