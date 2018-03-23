import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux'
import './PropertyForm.css'

// import callApi from '../../../utils/callApi'
import { fetchPropertyType } from '../PropertyAction';
import { getPropertyType } from '../PropertyReducer';

const Input = (props) => {
  const { label, checked, ...input } = props

  return (
    <label htmlFor={props.propertyType} className={checked ? 'active' : ''} >
      <FormattedMessage id={label} />
      <input id={props.name} {...input} />
    </label>
  )
}

const Rooms = ({ propertyType }) => {
  if (propertyType === 'studio') {
    return null
  }

  return (
    <div>
      <Input type="number" name="nbRoom" label="form.nbRoom.label" />
      <Input type="number" name="nbBedroom" label="form.nbBedroom.label" />
    </div>
  )
}

class PropertyForm extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.isStudio = () => this.state.propertyType === 'studio'
  }

  componentWillMount() {
    if (!this.props.propertyType && this.props.propertyType.length === 0) {
      this.props.fetchPropertyType()
    }
  }

  update(e) {
    const form = e.currentTarget
    let { nbRoom, nbBedroom, area, availableDate, propertyType } = form

    this.setState({
      nbRoom: this.isStudio ? 0 : nbRoom.value,
      nbBedroom: this.isStudio ? 0 : nbBedroom.value,
      area: area.value,
      availableDate: availableDate.value,
      propertyType: propertyType.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state)
  }

  render() {
    return (
      <form id="owner-form" onChange={(e) => this.update(e)} onSubmit={this.handleSubmit.bind(this)} >

        <div className="property-type" >
          <FormattedMessage id="form.propertyType.label" />
          {this.props.propertyType.map(type => (
            <Input
              type="radio"
              key={type._id}
              className="property-type"
              name="propertyType"
              value={type.name}
              checked={this.state.propertyType === type.name ? 'checked' : ''}
              label={"form.propertyType." + type.name} />)
          )}
        </div>

        <Rooms propertyType={this.state.propertyType} />

        <Input type="number" name="area" label="form.area.label" />

        <Input type="date" name="availableDate" label="form.availableDate.label" />

        <input type="submit" name="submit" value={this.props.strings.submit} />
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    strings: state.intl.strings.form,
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
