import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

export const MapBCN = () => {
  const containerStyle = {
    width: '100%', 
    height: '50vh'
  };

  const center = {
    lat: 41.38722958596703, 
    lng: 2.176920603629089
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