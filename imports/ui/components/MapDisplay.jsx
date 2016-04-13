import React, { Component } from 'react';
import {GOOGLEAPI} from '../../api/google-key.js';
import { dummyData } from '../../api/dummyData.js';

// code adapted from sample React demo by creator of map package
// https://github.com/dburles/meteor-google-maps-react-example/blob/master/googlemaps-react.jsx
export const MapDisplay = React.createClass({

  mixins: [ReactMeteorData],

  componentDidMount() {
    GoogleMaps.load();
  },

  markers: [],

  getMeteorData() {
    var self = this;
    var currentLoc = Geolocation.latLng();
    Meteor.call('posts.nearby', -122.4086548, 37.783406899999996, 10000, 5,
      function(err, result) {
       // results is an array of post objects
      if (err) { throw new Error ('Problem finding posts from database')}

      self.markers= result;
    });

    if(GoogleMaps.loaded() && currentLoc) {
      var options = {
        center: new google.maps.LatLng(currentLoc.lat, currentLoc.lng),
        zoom: MAP_ZOOM,
        libraries: 'geometry,places',
        key: GOOGLEAPI
      };
    }

    return {
      loaded: GoogleMaps.loaded(),
      mapOptions: GoogleMaps.loaded() && options,
      markers: self.markers
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
    // setting markers to a variable in this scope 
    // so we have access to it in the googlemap functions belo
    MyMap.markers = this.props.markers;

    //test to add information into the database, update information below to add more items
    // Meteor.call('posts.insert', 'https://lh5.ggpht.com/wAGD0ZKPLCAfKtKxUzxhQY_19EoBhWak8PX52HmnIweJjV1bRGyZotUcJ_Vibgnd0A=h900', -122.4086548, 37.783406899999996);

    // GoogleMaps and methods made available through meteor package
    GoogleMaps.create({
      name: this.props.name,
      element: document.getElementById('map-container'),
      options: this.props.options
    });

    // Once the map is ready, we can start setting the pins
    GoogleMaps.ready(this.props.name, function(map) {
      // loop through and create a pin for each photo in passed in markers
      for(let photo of MyMap.markers) {
        console.log('coordinates passed in by markers', photo.loc.coordinates);
        const photoCoor = {
          lat: photo.loc.coordinates[1],
          lng: photo.loc.coordinates[0]
        }
        var marker = new google.maps.Marker({
          position: photoCoor,
          map: map.instance,
          animation: google.maps.Animation.DROP,
          url: Meteor.absoluteUrl('photo/' + photo.id)
        });
        google.maps.event.addListener(marker, 'click', function() {
            window.location.href = this.url;
        });
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

const MAP_ZOOM = 10;

export {mapsStyles};
