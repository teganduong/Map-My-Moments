import React, { Component } from 'react';
import {GOOGLEAPI} from '../../api/google-keys.js';
import { MapDisplay, DEFAULT_MAX_POSTS, DEFAULT_MAP_ZOOM } from '../components/MapDisplay.jsx';

// code adapted from sample React demo by creator of map package
// https://github.com/dburles/meteor-google-maps-react-example/blob/master/googlemaps-react.jsx
export const MapContainer = React.createClass({

  mixins: [ReactMeteorData],

  componentDidMount() {
    GoogleMaps.load();
  },

  getInitialState: function() {
      return {
        markers: [],
        currentLoc: {}
      };
    },

  onMarkersUpdate: function(newMarkers) {
    this.setState({markers: newMarkers,});
  },

  getMeteorData() {
    var self = this;
    var currentLoc = Geolocation.latLng();

    if(GoogleMaps.loaded() && currentLoc) {
      var markersSettings = {
        center: currentLoc,
        maxRecords: DEFAULT_MAX_POSTS,
        radius: 100000
      };

      Meteor.call('posts.nearby', markersSettings.center.lng, markersSettings.center.lat, markersSettings.radius, markersSettings.maxRecords,
              function(err, result) {
              if (err) { throw new Error ('Problem finding posts from database')}
              //use the onMarkersUpdate method to update the state so map markers can update reactively
              self.onMarkersUpdate(result);
            });

      var handle = Meteor.subscribe('posts.nearbyPub', markersSettings);

      if( handle.ready() ) {
        Meteor.call('posts.nearby', markersSettings.center.lng, markersSettings.center.lat, markersSettings.radius, markersSettings.maxRecords,
          function(err, result) {
          if (err) { throw new Error ('Problem finding posts from database')}
          self.onMarkersUpdate(result);
        });
      }

      var options = {
        center: new google.maps.LatLng(currentLoc.lat, currentLoc.lng),
        zoom: DEFAULT_MAP_ZOOM,
        libraries: 'geometry,places',
        key: GOOGLEAPI
      };
    }

    return {
      loaded: GoogleMaps.loaded(),
      mapOptions: GoogleMaps.loaded() && options,
      markers: self.markers,
    }
  },

  render() {
    if (this.data.loaded && this.data.mapOptions) {   
      return <MapDisplay name="mymap" options={this.data.mapOptions} markers={this.state.markers}/>;
    }   
    return <div>Loading map...</div>;
  }

});