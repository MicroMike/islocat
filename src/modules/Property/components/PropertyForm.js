import React, { Component } from 'react';
import FormattedMessage from 'IntlFormat';
import { connect } from 'react-redux'

import { storePropertyForm, storePropertyFormErrors } from '../PropertyAction';
import { setStepbar } from 'modules/Stepbar/StepbarAction'

import 'modules/Property/assets/propertyForm.less'

import whichStepbar from 'modules/Stepbar/Stepbar'
import { Radio, NumberRadio, Checkbox, Input } from '../../Form/Form'
import Recapitulatif from '../components/Recapitulatif';

const Stepbar = whichStepbar('property')

const formRequired = {
  1: [
    'propertyType'
  ],
  2: [
    'area',
    'rentalCharges',
    'monthlyRent',
    'availableDate'
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

    this.form = this.props.form
    this.maxStep = 1
  }

  renderSteps() {
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

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.props.form)
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

  validate(validateFields) {
    const valid = validateFields && validateFields.filter(field => {
      return !(this.props.form[field])
    })

    return valid || []
  }

  update(e) {
    const form = {
      [e.target.name]: e.target.type === 'checkbox'
        ? e.target.checked
        : e.target.value,
      ...this.constraint(e)
    }

    this.props.storePropertyForm(form)
    setTimeout(() => {
      this.props.storePropertyFormErrors(this.validate(this.props.errors))
    }, 0);
  }

  isValid(step = this.props.step) {
    let requiredFields = []

    for (let step in formRequired) {
      if (step <= this.props.step) {
        requiredFields.push(...formRequired[step])
      }
    }

    const isValid = this.validate(requiredFields)
    this.props.storePropertyFormErrors(isValid)

    return isValid.length === 0
  }

  next() {
    if (this.isValid()) {
      this.props.setStepbar(this.props.step + 1, 'OWNER_FORM_STEP')
    }
    else {

    }
  }

  // goToStep(step) {
  //   let currentStep = this.props.step

  //   if (step < currentStep) {
  //     this.setState({ step: step })
  //     return
  //   }

  //   for (currentStep; currentStep < step; currentStep++) {
  //     if (!this.isValid(currentStep)) {
  //       break
  //     }
  //   }
  //   this.setState({ step: currentStep })
  // }

  render() {
    this.renderSteps()
    const length = this.displayStep.length

    return (
      <form id="owner-form" onChange={(e) => this.update(e)} onSubmit={this.handleSubmit.bind(this)} >
        <div id="steps">
          <Stepbar length={length} />
        </div>

        {
          this.props.step > this.displayStep.length
            ? <Recapitulatif property={this.props.property} />
            : this.displayStep.map((display, index) => (
              index <= this.props.step - 1 ? (<div key={index} >{display}<br /><hr /></div>) : null
            ))
        }
        {/* <Input type="text" name="street" /> */}
        <br />
        {
          // this.props.step > 1 ? <button type="button" onClick={() => this.setState({ step: this.props.step - 1 })} ><FormattedMessage id='previous' /></button> : null
        }
        {
          this.props.step < length + 1 ? <button type="button" onClick={this.next.bind(this)} ><FormattedMessage id='next' /></button> : null
        }
        {
          this.props.step === length + 1 ? <button type="submit" ><FormattedMessage id='submit' /></button> : null
        }
      </form>
    )
  }
}

const mapStateToProps = (store) => ({
  form: store.property.form,
  errors: store.property.errors,
  step: store.property.step,
})

export default connect(
  mapStateToProps,
  {
    storePropertyForm: storePropertyForm,
    storePropertyFormErrors: storePropertyFormErrors,
    setStepbar: setStepbar,
  }
)(PropertyForm)
