import React, { Component } from 'react';
import {GOOGLEAPI} from '../../api/google-key.js';
import { dummyData } from '../../api/dummyData.js';

// code adapted from sample React demo by creator of map package
// https://github.com/dburles/meteor-google-maps-react-example/blob/master/googlemaps-react.jsx

export const MapDisplay = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    options: React.PropTypes.object.isRequired
  },
  
  componentDidMount() {
    // GoogleMaps and methods made available through meteor package
    GoogleMaps.create({
      name: this.props.name,
      element: document.getElementById('map-container'),
      options: this.props.options
    });

    // Once the map is ready, we can start setting the pins
    GoogleMaps.ready(this.props.name, function(map) {
      // loop through and create a pin for each photo in passed in markers
      if(MapDisplay.markers.length) {
        for(let photo of MapDisplay.markers) {
          const photoCoor = {
            lat: photo.loc.coordinates[1],
            lng: photo.loc.coordinates[0]
          }
          var marker = new google.maps.Marker({
            position: photoCoor,
            map: map.instance,
            animation: google.maps.Animation.DROP,
            url: Meteor.absoluteUrl('photo/' + photo._id)
          });
          google.maps.event.addListener(marker, 'click', function() {
              window.location.href = this.url;
          });
        }
      }
    });
  },

  componentWillReceiveProps() {
    // need to update the markers when props change
    MapDisplay.markers = this.props.markers;
    // This will trigger when new marker added to database, can test with live console log
    // problem is still rendering the pin to the map
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
  height: (window.innerHeight - 130),
  left: 0,
  top: 0,

  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4
};

export const DEFAULT_MAP_ZOOM = 10;
export const DEFAULT_MAX_POSTS = 10;

export {mapsStyles};
