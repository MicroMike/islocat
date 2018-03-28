import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux'

import { fetchPropertyType } from '../PropertyAction';
import { getPropertyType } from '../PropertyReducer';

import { Radio, NumberRadio, Checkbox, Input } from '../../Form/Form'

const Rooms = ({ state }) => {
  if (state.propertyType === 'studio') {
    return null
  }

  return (
    <div>
      <NumberRadio name="nbRoom" label="ownerForm.nbRoom" min={1} max={5} state={state} />
      <NumberRadio name="nbBedroom" label="ownerForm.nbBedroom" min={1} max={5} state={state} />
      {/* <Input type="number" name="nbRoom" label="ownerForm.nbRoom" /> */}
      {/* <Input type="number" name="nbBedroom" label="ownerForm.nbBedroom" /> */}
    </div>
  )
}

class PropertyForm extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.locationOptions = [
      'furnished',
      'airConditioner',
      'guardian',
      'carPark',
      'cellar',
      'elevator',
      'intercom',
      'groundFloor',
      'lastFloor',
    ]
  }

  componentWillMount() {
    if (!this.props.propertyType || this.props.propertyType.length === 0) {
      this.props.fetchPropertyType()
    }
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

        <Radio form="ownerForm" name="propertyType" choices={this.props.propertyType} state={this.state} />
        <hr />
        <Rooms state={this.state} />
        <Input type="number" name="area" label="ownerForm.area" />
        <Input type="number" name="monthlyRent" label="ownerForm.monthlyRent" />
        <Input type="number" name="rentalCharges" label="ownerForm.rentalCharges" />
        <Input type="date" name="availableDate" label="ownerForm.availableDate" />
        <hr />
        <NumberRadio name="floor" label="ownerForm.floor" max={10} state={this.state} />
        <Checkbox form="ownerForm" name="locationOptions" choices={this.locationOptions} state={this.state} />
        <hr />
        {/* <Input type="text" name="street" label="ownerForm.location.street" /> */}

        <input type="submit" name="submit" value={this.props.strings.submit} />
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    strings: state.intl.strings.commons,
    propertyType: getPropertyType(state)
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPropertyType: fetchPropertyType(dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyForm)
