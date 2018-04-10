import React, { Component } from 'react';
import FormattedMessage from '../../Intl/IntlFormat';
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
    "nbBedroom",
    "nbRoom"
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
  }

  componentWillMount() {
    // if (!this.props.propertyType || this.props.propertyType.length === 0) {
    //   this.props.fetchPropertyData()
    // }
  }

  update(e) {
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
    const stepPropertyType = <Radio name="propertyType" choices={Property.propertyType} state={this.state.form} />
    const stepPropertyInfos = (
      <div>
        <Input type="date" name="availableDate" />
        <Input type="number" name="area" />
        <Input type="number" name="monthlyRent" />
        <Input type="number" name="rentalCharges" />
      </div>
    )
    const stepPropertyOptions = (
      <div>
        <Rooms state={this.state.form} />
        <NumberRadio name="floor" max={10} state={this.state.form} />
        <Checkbox name="propertyOptions" choices={Property.propertyOptions} state={this.state.form} />
        <Radio name="heating" choices={Property.heating} state={this.state.form} />
        <Radio name="energyClass" choices={Property.energyClass} state={this.state.form} noTrad={true} />
      </div>
    )
    const stepBuildingOptions = <Checkbox name="buildingOptions" choices={Property.buildingOptions} state={this.state.form} />
    const stepKitchen = <Checkbox name="kitchen" choices={Property.kitchen} state={this.state.form} />
    const stepBathroom = <Checkbox name="bathroom" choices={Property.bathroom} state={this.state.form} />

    const recap = Object.keys(Property).map(key => {
      const isString = typeof this.state.form[key] === 'string'
      return (<div key={key} >
        <h2><FormattedMessage id={key} /><br /></h2>
        {
          !isString
            ? Property[key].map(input => {
              const value = this.state.form[input]
              const isValueString = typeof value === 'string'

              return (
                <p key={input}>
                  {
                    isValueString
                      ? <span>
                        <FormattedMessage id={input} /> :
                        {' '}
                        {this.state.form[input]}
                      </span>
                      : value
                        ? <FormattedMessage id={input} />
                        : null
                  }
                </p>
              )
              // return isString ? <p><FormattedMessage id={input} />: </p>
            })
            : <h3><FormattedMessage id={this.state.form[key]} /></h3>
        }
      </div>)
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
          {/* <Input type="text" name="street" /> */}
          <br />
          <hr />
          <br />
          {
            this.state.step > 1 ? <button type="button" onClick={() => this.setState({ step: this.state.step - 1 })} >{this.props.intl.messages.previous}</button> : null
          }
          {
            this.state.step < 7 ? <button type="button" onClick={() => this.setState({ step: this.state.step + 1 })} >{this.props.intl.messages.next}</button> : null
          }
          {
            this.state.step === 7 ? <input type="submit" name="submit" value={this.props.intl.messages.submit} /> : null
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
