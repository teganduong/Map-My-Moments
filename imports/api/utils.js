// A utility function to get the radius from the center of the map in meters at current zoom level
//based off of http://stackoverflow.com/questions/3525670/radius-of-viewable-region-in-google-maps-v3
export const radiusOfCurrentZoom = function(map) {
  const bounds = map.getBounds();
  const center = map.getCenter();
  if (bounds && center) {
    const ne = bounds.getNorthEast();
    // Calculate radius (in meters).
    const radius = google.maps.geometry.spherical.computeDistanceBetween(center, ne);
    return radius;
  }
};