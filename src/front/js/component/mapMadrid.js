import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

export const MapMadrid = () => {
  const containerStyle = {
    width: '100%', 
    height: '50vh'
  };

  const center = {
    lat: 40.420769565199215, 
    lng: -3.7073764154435906
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.MAPSKEY}>
      <GoogleMap 
        mapContainerStyle={containerStyle} center={center} zoom={10}>
      </GoogleMap>
    </LoadScript>
  );
};
