import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux'
import './PropertyForm.css'

// import callApi from '../../../utils/callApi'
import { fetchPropertyType } from '../PropertyAction';
import { getPropertyType } from '../PropertyReducer';

const PropertyType = ({ propertyType, onChange }) => (
  <div className="property-type" >
    <input type="radio" name="propertyType" id={propertyType} value={propertyType} />
    <label htmlFor={propertyType}>
      <FormattedMessage id={'form.propertyType.' + propertyType} />
    </label>
  </div >
)

const Rooms = ({ propertyType }) => {
  if (!propertyType || propertyType === 'studio') {
    return null
  }

  return (
    <div>
      <p><FormattedMessage id="form.nbRoom.label" /> :</p>
      <input type="number" name="nbRoom" />
      <p><FormattedMessage id="form.nbBedroom.label" /> :</p>
      <input type="number" name="nbBedroom" />
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
    if (this.props.propertyType.length === 0) {
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

        <p><FormattedMessage id="form.propertyType.label" /> :</p>
        {this.props.propertyType.map(type => (<PropertyType key={type._id} propertyType={type.name} />))}

        <Rooms propertyType={this.state.propertyType} />

        <p><FormattedMessage id="form.area.label" /> :</p>
        <input type="number" name="area" />

        <p><FormattedMessage id="form.availableDate.label" /> :</p>
        <input type="date" name="availableDate" />

        <br />
        <br />

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
