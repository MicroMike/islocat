import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
// import { connect } from 'react-redux'

// import { fetchPropertyData } from '../PropertyAction';
// import * as Property from '../PropertyReducer';

import './propertyForm.less'

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
  propertyInfos: [
    "area",
    "rentalCharges",
    "monthlyRent",
    "availableDate",
  ],
  buildingOptions: [
    "intercom",
    "elevator",
    "digicode",
    "elevatorShabbath",
    "guardian",
    "handicapAccess",
    "carPark",
    "cellar"
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
  ],
  energyClass: [{ label: 'pending' }, 'A', 'B', 'C', 'D', 'E', 'F', 'G'],
}

const Rooms = ({ state }) => {
  if (state.propertyType === 'studio') {
    return null
  }

  return (
    <div id="rooms" >
      <NumberRadio name="nbBedroom" label="ownerForm.propertyInfos.nbBedroom" min={1} max={5} state={state} />
      <NumberRadio name="nbRoom" label="ownerForm.propertyInfos.nbRoom" min={1} max={5} state={state} />
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
  }

  componentWillMount() {
    // if (!this.props.propertyType || this.props.propertyType.length === 0) {
    //   this.props.fetchPropertyData()
    // }
  }

  update(e) {
    console.log(e.target)
    const update = {
      ...this.state.form,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }
    this.setState({ form: update })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.form)
  }

  render() {
    const stepPropertyType = <Radio form="ownerForm" name="propertyType" choices={Property.propertyType} state={this.state.form} />
    const stepPropertyInfos = (
      <div>
        <Input type="date" name="availableDate" label="ownerForm.propertyInfos.availableDate" />
        <Input type="number" name="area" label="ownerForm.propertyInfos.area" />
        <Input type="number" name="monthlyRent" label="ownerForm.propertyInfos.monthlyRent" />
        <Input type="number" name="rentalCharges" label="ownerForm.propertyInfos.rentalCharges" />
      </div>
    )
    const stepPropertyOptions = (
      <div>
        <Rooms state={this.state.form} />
        <NumberRadio name="floor" label="ownerForm.propertyInfos.floor" max={10} state={this.state.form} />
        <Checkbox form="ownerForm" name="propertyOptions" choices={Property.propertyOptions} state={this.state.form} />
        <Radio form="ownerForm" name="heating" choices={Property.heating} state={this.state.form} />
        <Radio form="ownerForm" name="energyClass" choices={Property.energyClass} state={this.state.form} noTrad={true} />
      </div>
    )
    const stepBuildingOptions = <Checkbox form="ownerForm" name="buildingOptions" choices={Property.buildingOptions} state={this.state.form} />
    const stepKitchen = <Checkbox form="ownerForm" name="kitchen" choices={Property.kitchen} state={this.state.form} />
    const stepBathroom = <Checkbox form="ownerForm" name="bathroom" choices={Property.bathroom} state={this.state.form} />

    const recap = Object.keys(Property).map(key => {
      return (<p key={key} >
        <FormattedMessage id={'ownerForm.' + key + '.label'} /><br />
        {this.state.form[key] ? <span> {this.state.form[key]} </span> : null}
        {
          !this.state.form[key]
            ? Property[key].map(input => {
              return <span key={input} > {this.state.form[input]} </span>
            })
            : null
        }
      </p>)
    })

    return (
      <div>
        <form id="owner-form" onChange={(e) => this.update(e)} onSubmit={this.handleSubmit.bind(this)} >
          <div id="steps">
            {
              [1, 2, 3, 4, 5, 6].map(step => (
                <button type="button" key={step} className={this.state.step > step ? 'active' : ''} onClick={() => this.setState({ step: step })} >{step}</button>
              ))
            }
          </div>

          {this.state.step === 1 ? stepPropertyType : null}
          {this.state.step === 2 ? stepPropertyInfos : null}
          {this.state.step === 3 ? stepPropertyOptions : null}
          {this.state.step === 4 ? stepBuildingOptions : null}
          {this.state.step === 5 ? stepKitchen : null}
          {this.state.step === 6 ? stepBathroom : null}
          {/* <Input type="text" name="street" label="ownerForm.property.street" /> */}
          <hr />
          {
            this.state.step > 1 ? <button type="button" onClick={() => this.setState({ step: this.state.step - 1 })} >{this.props.intl.messages['commons.previous']}</button> : null
          }
          {
            this.state.step < 7 ? <button type="button" onClick={() => this.setState({ step: this.state.step + 1 })} >{this.props.intl.messages['commons.next']}</button> : null
          }
          {
            this.state.step === 7 ? <input type="submit" name="submit" value={this.props.intl.messages['commons.submit']} /> : null
          }
        </form>
        <div>
          {this.state.step === 7 ? recap : null}
        </div>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     strings: state.intl.strings.commons,
//     // propertyType: Property.getPropertyType(state),
//     // propertyInfo: Property.getPropertyInfo(state),
//     // propertyOptions: Property.getPropertyOptions(state),
//     // buildingOptions: Property.getBuildingOptions(state),
//   }
// }
// const mapDispatchToProps = (dispatch) => {
//   return {
//     // fetchPropertyData: fetchPropertyData(dispatch),
//   }
// }

export default injectIntl(PropertyForm)
