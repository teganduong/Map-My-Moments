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
      return <MyMap name="mymap" options={this.data.mapOptions} markers={this.state.markers}/>;
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
    // GoogleMaps and methods made available through meteor package
    GoogleMaps.create({
      name: this.props.name,
      element: document.getElementById('map-container'),
      options: this.props.options
    });

    // Once the map is ready, we can start setting the pins
    GoogleMaps.ready(this.props.name, function(map) {
      // loop through and create a pin for each photo in passed in markers
      if(MyMap.markers.length) {
        for(let photo of MyMap.markers) {
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
      }
    });
  },

  componentWillReceiveProps() {
    // need to update the markers when props change
    MyMap.markers = this.props.markers;
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

export const DEFAULT_MAP_ZOOM = 10;
export const DEFAULT_MAX_POSTS = 10;

export {mapsStyles};
