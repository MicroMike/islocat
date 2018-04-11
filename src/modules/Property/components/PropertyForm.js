import React, { Component } from 'react';
import FormattedMessage from '../../Intl/IntlFormat';
import { connect } from 'react-redux'

import { storePropertyForm } from '../PropertyAction';
// import * as Property from '../PropertyReducer';

import './assets/propertyForm.less'

import { Radio, NumberRadio, Checkbox, Input } from '../../Form/Form'

const formRequired = {
  step1: [
    'propertyType'
  ],
  step2: [
    'area',
    'rentalCharges',
    'monthlyRent',
    'availableDate'
  ],
  step3: [
    'nbBedroom',
    'nbRoom',
    'floor'
  ],
  step4: [
    'heating',
    'energyClass'
  ],
}


const Rooms = ({ state }) => {
  if (state.propertyType === 'studio') {
    return null
  }

  return (
    <div id="rooms" >
      <NumberRadio name="nbBedroom" min={1} max={5} state={state} />
      <NumberRadio name="nbRoom" min={1} max={5} state={state} />
    </div>
  )
}

class PropertyForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      step: 1,
      form: {}
    }

    this.form = this.props.form
    this.maxStep = 1
  }

  initSteps() {
    const stepPropertyType = <Radio name="propertyType" choices={this.props.property.propertyType} state={this.props.form} />

    const stepPropertyInfos = (
      <div>
        <Input type="date" name="availableDate" defaultValue={this.props.form.availableDate} />
        <Input type="number" name="area" defaultValue={this.props.form.area} />
        <Input type="number" name="monthlyRent" defaultValue={this.props.form.monthlyRent} />
        <Input type="number" name="rentalCharges" defaultValue={this.props.form.rentalCharges} />
      </div>
    )

    const stepPropertyOptions = (
      <div>
        <Rooms state={this.props.form} />
        <NumberRadio name="floor" max={10} state={this.props.form} />
        <Checkbox name="propertyOptions" choices={this.props.property.propertyOptions} state={this.props.form} />
      </div>
    )

    const stepEnergyHeating = (
      <div>
        <Radio name="heating" choices={this.props.property.heating} state={this.props.form} />
        <Radio name="energyClass" choices={this.props.property.energyClass} state={this.props.form} noTrad={true} />
      </div>
    )

    const stepBuildingOptions = <Checkbox name="buildingOptions" choices={this.props.property.buildingOptions} state={this.props.form} />
    const stepKitchen = <Checkbox name="kitchen" choices={this.props.property.kitchen} state={this.props.form} />
    const stepBathroom = <Checkbox name="bathroom" choices={this.props.property.bathroom} state={this.props.form} />

    this.displayStep = [
      stepPropertyType,
      stepPropertyInfos,
      stepPropertyOptions,
      stepEnergyHeating,
      stepBuildingOptions,
      stepKitchen,
      stepBathroom,
    ]
  }

  update(e) {
    const form = {
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }
    this.props.storePropertyForm(form)
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.props.form)
  }

  isValid(step = this.state.step) {
    const requiredFields = formRequired['step' + step]

    const valid = requiredFields && requiredFields.filter(field => {
      return !(typeof this.props.form[field] === 'string' && this.props.form[field])
    })

    return !valid || valid.length === 0
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

  render() {
    console.log('render')
    this.initSteps()

    let steps = []
    for (let step = 1; step <= this.displayStep.length; step++) {
      steps.push(
        <button type="button" key={step}
          className={step < this.maxStep ? 'active' : ''}
          onClick={step <= this.maxStep ? () => this.goToStep(step) : null}
        >{step}</button>
      )
    }

    return (
      <form id="owner-form" onChange={(e) => this.update(e)} onSubmit={this.handleSubmit.bind(this)} >
        <div id="steps">
          {steps}
        </div>

        {this.displayStep[this.state.step - 1]}
        {/* <Input type="text" name="street" /> */}
        <br />
        <hr />
        <br />
        {
          this.state.step > 1 ? <button type="button" onClick={() => this.setState({ step: this.state.step - 1 })} ><FormattedMessage id='previous' text /></button> : null
        }
        {
          this.state.step < steps.length + 1 ? <button type="button" onClick={this.next.bind(this)} ><FormattedMessage id='next' text /></button> : null
        }
        {
          this.state.step === steps.length + 1 ? <button type="submit" ><FormattedMessage id='submit' text /></button> : null
        }
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  form: state.property
})

export default connect(
  mapStateToProps,
  { storePropertyForm: storePropertyForm }
)(PropertyForm)
