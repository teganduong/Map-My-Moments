import React, { Component } from 'react';
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
    const selfProps= this.props;
    GoogleMaps.create({
      name: this.props.name,
      element: document.getElementById('map-container'),
      options: this.props.options
    });

    // Once the map is ready, we can start setting the pins
    GoogleMaps.ready(this.props.name, function(map) {
      //set initial radius and markers of map instance
      selfProps.setMapRadius(map.instance);
      selfProps.setPhotos();

      //add listener for when zoom level changes 
      //https://developers.google.com/maps/documentation/javascript/events#EventProperties
      map.instance.addListener('zoom_changed', function() {
        selfProps.setMapRadius(map.instance);
        selfProps.setPhotos();
      });
    });

    this.generateMarkers();
  },

  componentWillReceiveProps() {
    this.generateMarkers();
  },

  generateMarkers() {
    const selfProps= this.props;
    // Once the map is ready, we can start setting the pins
    GoogleMaps.ready(this.props.name, function(map) {

      // loop through and create a pin for each photo in passed in markers
      if(selfProps.photos.length) {
        //first clear map of markers
        for(let marker of selfProps.markers) {
          marker.setMap(null);
        }

        for(let photo of selfProps.photos) {
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

          selfProps.addMarker(marker);
        }
      }
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

export const DEFAULT_MAP_ZOOM = 15;
export const DEFAULT_MAX_POSTS = 10;
