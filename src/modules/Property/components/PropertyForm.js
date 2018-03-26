import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux'
import './PropertyForm.css'

import { fetchPropertyType } from '../PropertyAction';
import { getPropertyType } from '../PropertyReducer';

import { Radio, Checkbox, Input } from '../../Form/Form'

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
    const locationOptions = [
      'furnished',
      'airConditioner',
      'guardian'
    ]

    return (
      <form id="owner-form" onChange={(e) => this.update(e)} onSubmit={this.handleSubmit.bind(this)} >

        <Radio label="ownerForm.propertyType." name="propertyType" choices={this.props.propertyType} state={this.state} />

        <Rooms propertyType={this.state.propertyType} />

        <Input type="number" name="area" label="ownerForm.area" />

        <Input type="date" name="availableDate" label="ownerForm.availableDate" />

        <Input type="number" name="monthlyRent" label="ownerForm.monthlyRent" />

        <Input type="number" name="rentalCharges" label="ownerForm.rentalCharges" />

        <Checkbox label="ownerForm.locationOptions." name="locationOptions" choices={locationOptions} state={this.state} />

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
