import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
// import { connect } from 'react-redux'

// import { fetchPropertyData } from '../PropertyAction';
// import * as Property from '../PropertyReducer';

import { Radio, NumberRadio, Checkbox, Input } from '../../Form/Form'
import { injectIntl } from 'react-intl';

const Property = {
  propertyType: [
    "studio",
    "home",
    "apartment",
    "villa",
    "penthouse",
  ],
  // propertyInfo: [
  //   "area",
  //   "rentalCharges",
  //   "monthlyRent",
  //   "availableDate",
  // ],
  buildingOptions: [
    "intercom",
    "elevator",
    "digicode",
    "elevatorShabbath",
    "guardian",
    "handicapAccess",
  ],
  propertyOptions: [
    "furnished",
    "airConditioner",
    "groundFloor",
    "lastFloor",
  ],
  kitchen: [
    'separate',
    'american',
    'equiped'
  ]
}

const Rooms = ({ state }) => {
  if (state.propertyType === 'studio') {
    return null
  }

  return (
    <div id="rooms" >
      <NumberRadio name="nbBedroom" label="ownerForm.nbBedroom" min={1} max={5} state={state} />
      <NumberRadio name="nbRoom" label="ownerForm.nbRoom" min={1} max={5} state={state} />
    </div>
  )
}

class PropertyForm extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentWillMount() {
    // if (!this.props.propertyType || this.props.propertyType.length === 0) {
    //   this.props.fetchPropertyData()
    // }
  }

  update(e) {
    const update = {
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }
    this.setState(update)
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state)
  }

  render() {

    return (
      <form id="owner-form" onChange={(e) => this.update(e)} onSubmit={this.handleSubmit.bind(this)} >

        <Radio form="ownerForm" name="propertyType" choices={Property.propertyType} state={this.state} />
        <hr />
        <Input type="number" name="area" label="ownerForm.area" />
        <Input type="number" name="monthlyRent" label="ownerForm.monthlyRent" />
        <Input type="number" name="rentalCharges" label="ownerForm.rentalCharges" />
        <Input type="date" name="availableDate" label="ownerForm.availableDate" />
        <hr />
        <Rooms state={this.state} />
        <NumberRadio name="floor" label="ownerForm.floor" max={10} state={this.state} />
        <Checkbox form="ownerForm" name="propertyOptions" choices={Property.propertyOptions} state={this.state} />
        <hr />
        <Checkbox form="ownerForm" name="buildingOptions" choices={Property.buildingOptions} state={this.state} />
        <hr />
        <Radio form="ownerForm" name="kitchen" choices={Property.kitchen} state={this.state} />

        <hr />
        {/* <Input type="text" name="street" label="ownerForm.property.street" /> */}

        <input type="submit" name="submit" value={this.props.intl.messages['commons.submit']} />
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    strings: state.intl.strings.commons,
    // propertyType: Property.getPropertyType(state),
    // propertyInfo: Property.getPropertyInfo(state),
    // propertyOptions: Property.getPropertyOptions(state),
    // buildingOptions: Property.getBuildingOptions(state),
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // fetchPropertyData: fetchPropertyData(dispatch),
  }
}

export default injectIntl(PropertyForm)
