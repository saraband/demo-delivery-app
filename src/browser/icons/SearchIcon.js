import React from 'react';
import Colors from '../constants/Colors';

export default function ({ color = Colors.WHITE, ...rest }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-182.9 76.1 408.9 408.9" {...rest}>
      <path fill={color} d="M77.4 185.1c19.6 4.5 35.2 21.3 39.8 39.5 1.6 8.5 9 15 17.9 15 10 0 18.2-8.2 18.2-18.2 0-13.1-11-33-26-47.9-14.8-14.5-32.3-24.8-46.7-24.8-10 0-18.2 8.4-18.2 18.4 0 9 6.4 16.4 15 18zm-249.8 238.2c-14.1 14.1-14.1 37 0 51.1 14.1 14.1 37 14.1 51 0L-17 370.1c24.3 15.2 53.1 24 84 24 87.9 0 159-71.1 159-159s-71.1-159-159-159-159 71.1-159 159c0 30.8 8.8 59.6 24 84l-104.4 104.2zm125.8-188.2c0-62.7 50.9-113.6 113.6-113.6s113.6 50.9 113.6 113.6c0 62.7-50.9 113.6-113.6 113.6S-46.6 297.8-46.6 235.1z"/>
    </svg>
  );
}