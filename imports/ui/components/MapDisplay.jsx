import React, { Component } from 'react';
import {GOOGLEAPI} from '../../api/google-key.js';
import { createContainer } from 'meteor/react-meteor-data';

// export createContainer(({ params }) => {
//   const currentLoc = Tracker.autorun(function () {
//     console.log("The current location is", Geolocation.latLng());
//     });

//   const mapOptions = {
//         center: new google.maps.LatLng(currentLoc.lat, currentLoc.lng),
//         zoom: MAP_ZOOM,
//         libraries: 'geometry,places',
//         apiKey: GOOGLEAPI
//       };
// }

export default createContainer(({  }) => {
  console.log('i am in map options! currentLoc not getting returned?: ', currentLoc);
  const currentLoc = Tracker.autorun(function () {
   console.log("The current location is", Geolocation.latLng());
  });

  const name = 'mymoments';
  const options = {
        center: new google.maps.LatLng(-37.8136, 144.9631),
        zoom: MAP_ZOOM,
        libraries: 'geometry,places',
        apiKey: GOOGLEAPI
  };
  return {
    name,
    options
  };
}, MapDisplay);

class MapDisplay extends Component {
  constructor(props) {
      super(props);
  }

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
  }

  componentWillUnmount() {
    if (GoogleMaps.maps[this.props.name]) {
      google.maps.event.clearInstanceListeners(GoogleMaps.maps[this.props.name].instance);
      delete GoogleMaps.maps[this.props.name];
    } 
  }

  render() {
    return <div className="map-container" id="map-container" style={mapsStyles}></div>;
  }

}

MapDisplay.propTypes = {
  name: React.PropTypes.string.isRequired,
  options: React.PropTypes.object.isRequired
};
