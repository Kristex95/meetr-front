/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';

const MapEmbed = () => {
  return (
    <div style={{ width: '100%' }}>
      <iframe
        src="https://www.google.com/maps/embed?q=48.8588443,2.2943506"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapEmbed;
