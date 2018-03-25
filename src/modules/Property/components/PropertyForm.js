import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux'
import './PropertyForm.css'

// import callApi from '../../../utils/callApi'
import { fetchPropertyType } from '../PropertyAction';
import { getPropertyType } from '../PropertyReducer';

const Input = (props) => {
  const { label, isChecked, ...input } = props
  const checked = isChecked ? 'active' : ''

  return (
    <label htmlFor={props.id} className={checked} >
      <FormattedMessage id={label} />
      <input {...input} />
    </label>
  )
}

const Radio = (props) => {
  const label = 'ownerForm.' + props.name + '.'

  return (
    <div className="radio-checkbox" >
      <FormattedMessage id={label + 'label'} />
      {props.choices.map(choice => (
        <Input
          key={props.name + '-' + choice}
          type="radio"
          name={props.name}
          label={label + choice}
          id={props.name + '-' + choice}
          value={choice}
          isChecked={props.checked[props.name] === choice}
        />
      ))}
    </div>
  )
}

const Checkbox = (props) => {
  const label = 'ownerForm.' + props.name + '.'

  return (
    <div className="radio-checkbox" >
      <FormattedMessage id={label + 'label'} />
      {props.choices.map(choice => (
        <Input
          key={props.name + '-' + choice}
          type="checkbox"
          name={choice}
          label={"ownerForm." + props.name + "." + choice}
          isChecked={props.state[choice]}
        />
      ))}
    </div>
  )
}

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

        <Radio name="propertyType" choices={this.props.propertyType} checked={this.state} />

        <Rooms propertyType={this.state.propertyType} />

        <Input type="number" name="area" label="ownerForm.area" />

        <Input type="date" name="availableDate" label="ownerForm.availableDate" />

        <Input type="number" name="monthlyRent" label="ownerForm.monthlyRent" />

        <Input type="number" name="rentalCharges" label="ownerForm.rentalCharges" />

        <Checkbox name="locationOptions" choices={locationOptions} state={this.state} />

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
