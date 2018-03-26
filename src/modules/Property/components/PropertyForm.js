import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux'

import { fetchPropertyType } from '../PropertyAction';
import { getPropertyType } from '../PropertyReducer';

import { Radio, Checkbox, Input, Select } from '../../Form/Form'

const Rooms = ({ propertyType }) => {
  if (propertyType === 'studio') {
    return null
  }

  return (
    <div>
      <Input type="number" name="nbRoom" label="ownerForm.nbRoom" />
      <Input type="number" name="nbBedroom" label="ownerForm.nbBedroom" />
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

    this.selectFloor = []
    let i = 0

    for (i; i < 10; i++) {
      this.selectFloor.push(<option key={i} >{i}</option>)
    }
    this.selectFloor.push(<option key={i} value={i} >{i + '+'}</option>)
  }

  componentWillMount() {
    if (!this.props.propertyType || this.props.propertyType.length === 0) {
      this.props.fetchPropertyType()
    }
  }

  update(e) {
    const update = {}
    console.log(e.target.checked)
    update[e.target.name] = e.target.type === 'checkbox' ? e.target.checked : e.target.value
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
        <Rooms propertyType={this.state.propertyType} />
        <Input type="number" name="area" label="ownerForm.area" />
        <Input type="number" name="monthlyRent" label="ownerForm.monthlyRent" />
        <Input type="number" name="rentalCharges" label="ownerForm.rentalCharges" />
        <Input type="date" name="availableDate" label="ownerForm.availableDate" />
        <hr />
        <Select form="ownerForm" name="floor" options={this.selectFloor} />
        <Checkbox form="ownerForm" name="locationOptions" choices={this.locationOptions} state={this.state} />
        <hr />
        <Input type="text" name="street" label="ownerForm.location.street" />

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
