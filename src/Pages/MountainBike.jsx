import React, { useState } from 'react';
import data from '/data.json';
import BikeList from '../components/Common/BikeList';

export const MountainBike = () => {
  return <BikeList tipo="Mountain Bike" />;
}
