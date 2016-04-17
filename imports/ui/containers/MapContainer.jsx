import React, { Component } from 'react';
import {GOOGLEAPI} from '../../api/google-keys.js';
import { MapDisplay, DEFAULT_MAX_POSTS, DEFAULT_MAP_ZOOM } from '../components/MapDisplay.jsx';
import { radiusOfCurrentZoom } from '../../api/utils';

// code adapted from sample React demo by creator of map package
// https://github.com/dburles/meteor-google-maps-react-example/blob/master/googlemaps-react.jsx
export const MapContainer = React.createClass({

  mixins: [ReactMeteorData],

  componentDidMount() {
    GoogleMaps.load();
  },

  getInitialState: function() {
      return {
        photos: [],
        markers: [],
        radius: 100000,
        zoom: DEFAULT_MAP_ZOOM,
        map: {}
      };
    },

  //This method updates the markers of the container when called (e.g. zoom change)
  setPhotos: function() {
    let self = this;
    self.resetMarkers();
    Meteor.call('posts.nearby', this.data.currentLoc.lng, this.data.currentLoc.lat, this.state.radius, DEFAULT_MAX_POSTS,
            function(err, result) {
            if (err) { throw new Error ('Problem finding posts from database')}
            self.setState({photos: result});
            //adding markers so map can render
            for(let post of result) {
              const photoCoor = {
                lat: post.loc.coordinates[1],
                lng: post.loc.coordinates[0]
              }

              var marker = new google.maps.Marker({
                position: photoCoor,
                // map: map.instance,
                animation: google.maps.Animation.DROP,
                url: Meteor.absoluteUrl('photo/' + post._id)
              });
              self.addMarker(marker);
            }

          });
  },

  addMarker: function(newMarker) {
    let markers = this.state.markers;
    markers.push(newMarker);
    this.setState({markers: markers});
  },

  //need to reset markers when map state changes, e.g. zoom change
  resetMarkers: function() {
    let markers = this.state.markers;
    for (marker of markers) {
      marker.setMap(null);
    }
    this.setState({markers: []});
  },

  setMapRadius: function(mapInstance) {
    //change state so that radius adjusts for new map instances
    this.setState({radius: radiusOfCurrentZoom(mapInstance), zoom: mapInstance.zoom });
  },

  setMapInstance: function(mapInstance) {
    this.setState({map: mapInstance});
    console.log('map state set: ', this.state.map);
  },

  getMeteorData() {
    var self = this;
    var currentLoc = Geolocation.latLng();
   
    if(GoogleMaps.loaded() && currentLoc) {
      var markersSettings = {
        center: currentLoc,
        maxRecords: DEFAULT_MAX_POSTS,
        radius: this.state.radius
      };

      // Meteor.call('posts.nearby', markersSettings.center.lng, markersSettings.center.lat, markersSettings.radius, markersSettings.maxRecords,
      //         function(err, result) {
      //         if (err) { throw new Error ('Problem finding posts from database')}
      //         //use the onMarkersUpdate method to update the state so map markers can update reactively
      //         self.onMarkersUpdate(result);
      //       });

      // var handle = Meteor.subscribe('posts.nearbyPub', markersSettings);

      // if( handle.ready() ) {
      //   Meteor.call('posts.nearby', markersSettings.center.lng, markersSettings.center.lat, markersSettings.radius, markersSettings.maxRecords,
      //     function(err, result) {
      //     if (err) { throw new Error ('Problem finding posts from database')}
      //     self.onMarkersUpdate(result);
      //   });
      // }

      var options = {
        center: new google.maps.LatLng(currentLoc.lat, currentLoc.lng),
        zoom: this.state.zoom,
        libraries: 'geometry,places',
        key: GOOGLEAPI
      };
    }

    return {
      loaded: GoogleMaps.loaded(),
      mapOptions: GoogleMaps.loaded() && options,
      photos: self.state.photos,
      currentLoc: currentLoc
    }
  },

  render() {
    if (this.data.loaded && this.data.mapOptions) {
      return <MapDisplay 
                name="mymap" 
                options={this.data.mapOptions} 
                photos={this.data.photos}
                markers={this.state.markers}
                map={this.state.map}
                setMapRadius = {this.setMapRadius}
                setPhotos= {this.setPhotos} 
                addMarker= {this.addMarker}
                setMapInstance= {this.setMapInstance} />;
    }   
    return <div>Loading map...</div>;
  }

});