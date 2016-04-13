import React, { Component } from 'react';
import {GOOGLEAPI} from '../../api/google-key.js';

// code adapted from sample React demo by creator of map package
// https://github.com/dburles/meteor-google-maps-react-example/blob/master/googlemaps-react.jsx
export const PhotoMap = React.createClass({

  mixins: [ReactMeteorData],

  componentDidMount() {
    GoogleMaps.load();
  },

  getMeteorData() {
    var currentLoc = {
      lat: -37.8136,
      lng: 144.9631

    };

    if(GoogleMaps.loaded()) {
      const handle = Tracker.autorun(function(){
        var currentLoc = Geolocation.latLng();
        
        console.log('these are updated coordinates', currentLoc);
      } );
    }
    return {
      loaded: GoogleMaps.loaded(),
      mapOptions: GoogleMaps.loaded() && this._mapOptions(currentLoc)
    };
  },

  _mapOptions(currentLoc) {

    console.log('map options center coordinates: ', currentLoc);

    // if (GoogleMaps.loaded() && currentLoc) {
      return {
        center: new google.maps.LatLng(currentLoc.lat, currentLoc.lng),
        zoom: MAP_ZOOM,
        libraries: 'geometry,places',
        key: GOOGLEAPI
      };
    // }
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
    // need to wait to do this create below until we have a current location
    console.log('These are the options in GoogleMap ', this.props.options);

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
