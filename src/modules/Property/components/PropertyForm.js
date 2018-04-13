import React, { Component } from 'react';
import FormattedMessage from 'IntlFormat';
import { connect } from 'react-redux'

import { storePropertyForm, storePropertyFormErrors } from '../PropertyAction';
// import * as Property from '../PropertyReducer';

import 'modules/Property/assets/propertyForm.less'

import { Radio, NumberRadio, Checkbox, Input } from '../../Form/Form'

const formRequired = {
  1: [
    'propertyType'
  ],
  2: [
    'area',
    // 'rentalCharges',
    // 'monthlyRent',
    // 'availableDate'
  ],
  3: [
    'nbBedroom',
    'nbRoom',
    'floor'
  ],
  4: [
    'heating',
    'energyClass'
  ],
  9: [
    'address',
    'city',
    'zipcode'
  ],
}

const Rooms = (props) => {
  return props.form.propertyType === 'studio'
    ? null
    : (
      <div id="rooms" >
        <NumberRadio name="nbBedroom" min={1} max={5} {...props} />
        <NumberRadio name="nbRoom" min={1} max={5} {...props} />
      </div>
    )
}

class PropertyForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      step: 1,
      errors: []
    }

    this.form = this.props.form
    this.maxStep = 1
  }

  initSteps() {
    const form = this.props.form
    const errors = this.props.errors
    const property = this.props.property

    const radioCheckboxProps = {
      form: form,
      errors: errors
    }

    const stepPropertyType = <Radio name="propertyType" choices={property.propertyType} {...radioCheckboxProps} />

    const stepPropertyInfos = (
      <div>
        <Input type="date" name="availableDate" defaultValue={form.availableDate} errors={errors} />
        <Input type="number" name="area" defaultValue={form.area} errors={errors} />
        <Input type="number" name="monthlyRent" defaultValue={form.monthlyRent} errors={errors} />
        <Input type="number" name="rentalCharges" defaultValue={form.rentalCharges} errors={errors} />
      </div>
    )

    const stepPropertyOptions = (
      <div>
        <Rooms {...radioCheckboxProps} />
        <NumberRadio name="floor" max={10} {...radioCheckboxProps} />
        <Checkbox name="propertyOptions" choices={property.propertyOptions} {...radioCheckboxProps} />
      </div>
    )

    const stepEnergyHeating = (
      <div>
        <Radio name="heating" choices={property.heating} {...radioCheckboxProps} />
        <Radio name="energyClass" choices={property.energyClass} {...radioCheckboxProps} />
      </div>
    )

    const stepBuildingOptions = <Checkbox name="buildingOptions" choices={property.buildingOptions} {...radioCheckboxProps} />
    const stepKitchen = <Checkbox name="kitchen" choices={property.kitchen} {...radioCheckboxProps} />
    const stepBathroom = <Checkbox name="bathroom" choices={property.bathroom} {...radioCheckboxProps} />
    const stepNearbyServices = <Checkbox name="nearbyServices" choices={property.nearbyServices} {...radioCheckboxProps} />

    const stepLocation = (
      <div>
        <Input type="text" name="address" defaultValue={form.address} errors={errors} />
        <Input type="text" name="city" defaultValue={form.city} errors={errors} />
        <Input type="number" name="zipcode" defaultValue={form.zipcode} errors={errors} />
      </div>
    )

    this.displayStep = [
      stepPropertyType,
      stepPropertyInfos,
      stepPropertyOptions,
      stepEnergyHeating,
      stepBuildingOptions,
      stepKitchen,
      stepBathroom,
      stepNearbyServices,
      stepLocation
    ]
  }

  constraint(e) {
    const form = {}

    if (e.target.name === 'groundFloor' && e.target.checked) {
      form.floor = '0'
    }

    if (e.target.name === 'floor') {
      form.groundFloor = parseInt(e.target.value, 10) < 1
    }

    if (e.target.name === 'propertyType') {
      form.nbRoom = e.target.value === 'studio' ? '1' : ''
      form.nbBedroom = e.target.value === 'studio' ? '1' : ''
    }

    return form
  }

  update(e) {
    const form = {
      [e.target.name]: e.target.type === 'checkbox'
        ? e.target.checked
        : e.target.value,
      ...this.constraint(e)
    }

    this.props.storePropertyForm(form)
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.props.form)
  }

  isValid(step = this.state.step) {
    let requiredFields = []

    for (let step in formRequired) {
      if (step <= this.state.step) {
        requiredFields.push(...formRequired[step])
      }
    }

    const valid = requiredFields && requiredFields.filter(field => {
      return !(this.props.form[field])
    })

    const isValid = !valid || valid.length === 0

    this.props.storePropertyFormErrors(isValid ? [] : valid)

    return isValid
  }

  next() {
    let step = this.state.step

    if (this.isValid()) {
      this.setState({ step: ++step })
      this.maxStep = step > this.maxStep ? step : this.maxStep
    }
    else {

    }
  }

  goToStep(step) {
    let currentStep = this.state.step

    if (step < currentStep) {
      this.setState({ step: step })
      return
    }

    for (currentStep; currentStep < step; currentStep++) {
      if (!this.isValid(currentStep)) {
        break
      }
    }
    this.setState({ step: currentStep })
  }

  // render() {
  //   console.log(this.props)
  //   return ''
  // }

  render() {
    this.initSteps()

    let steps = []
    for (let step = 1; step <= this.displayStep.length; step++) {
      steps.push(
        <button type="button" key={step}
          className={step < this.maxStep ? 'active' : ''}
        // onClick={step <= this.maxStep ? () => this.goToStep(step) : null}
        >{step}</button>
      )
    }

    return (
      <form id="owner-form" onChange={(e) => this.update(e)} onSubmit={this.handleSubmit.bind(this)} >
        <div id="steps">
          {steps}
        </div>

        {this.displayStep.map((display, index) => (
          index <= this.state.step - 1 ? (<div key={index} >{display}<br /><hr /></div>) : null
        ))}
        {/* <Input type="text" name="street" /> */}
        <br />
        {
          // this.state.step > 1 ? <button type="button" onClick={() => this.setState({ step: this.state.step - 1 })} ><FormattedMessage id='previous' /></button> : null
        }
        {
          this.state.step < steps.length + 1 ? <button type="button" onClick={this.next.bind(this)} ><FormattedMessage id='next' /></button> : null
        }
        {
          this.state.step === steps.length + 1 ? <button type="submit" ><FormattedMessage id='submit' /></button> : null
        }
      </form>
    )
  }
}

const mapStateToProps = (store) => ({
  form: store.property.form,
  errors: store.property.errors
})

export default connect(
  mapStateToProps,
  {
    storePropertyForm: storePropertyForm,
    storePropertyFormErrors: storePropertyFormErrors,
  }
)(PropertyForm)
