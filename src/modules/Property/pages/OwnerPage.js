import React, { Component } from 'react';
import Helmet from 'react-helmet';

import Form from '../components/PropertyForm';

const Property = {
  propertyType: [
    'studio',
    'home',
    'apartment',
    'villa',
    'penthouse',
  ],
  propertyInfos: [
    'area',
    'rentalCharges',
    'monthlyRent',
    'availableDate',
    'nbBedroom',
    'nbRoom',
    'floor'
  ],
  buildingOptions: [
    'intercom',
    'elevator',
    'digicode',
    'elevatorShabbath',
    'guardian',
    'handicapAccess',
    'carPark',
    'cellar'
  ],
  propertyOptions: [
    'furnished',
    'airConditioner',
    'groundFloor',
    'lastFloor',
  ],
  kitchen: [
    'separate',
    'american',
    'equiped',
    'miniKitchen',
    'other',
  ],
  bathroom: [
    'seperateWC',
    'shower',
    'bath'
  ],
  heating: [
    'collective',
    'individualElectric',
    'individualGas',
    'other'
  ],
  energyClass: ['pending', 'A', 'B', 'C', 'D', 'E', 'F', 'G'],
  nearbyServices: [
    'school',
    'shops',
    'transport',
  ],
  location: [
    'address',
    'city',
    'zipcode',
  ]
}

export class OwnerPage extends Component {
  render() {
    return (
      <div>
        <Helmet title="Owner" />
        <Form property={Property} />
      </div>
    );
  }
}

export default OwnerPage;
