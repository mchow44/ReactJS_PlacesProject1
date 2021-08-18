// This component file uses Google Maps SDK API to retrieve map data
// the <script src="https://maps.googleapis.com/maps/api/..." call within index.html helps our Javascript render the Google Maps location to our page
import React, { useRef, useEffect } from 'react';
// { useRef } is used to create reference connection to the mapRef constant to our return statement below: <div ref={mapRef}>

import './Map.css';

// useEffect(); will have a function callback to define Google Maps within
const Map = props => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    // .Map is a constructor function that lets us 
    const map = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: zoom
      });
    
      // .Marker places a marker to the center of our map
      new window.google.maps.Marker({position: center, map: map});
  }, [center, zoom]); // end of useEffect() function

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;