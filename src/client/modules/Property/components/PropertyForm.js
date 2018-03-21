import React, { Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import styles from './PropertyForm.css'

const Input = (props) => {
  return <input {...props} />
}

const PropertyType = ({ propertyType, onChange }) => (
  <div className={styles.propertyType} >
    <Input type="radio" name="propertyType" id={propertyType} value={propertyType}/>
    <label htmlFor={propertyType}>
      <FormattedMessage id={'form.propertyType.' + propertyType} />
    </label>
  </div >
)

class PropertyForm extends Component {
  constructor() {
    super()

    this.state = {
      form: {}
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let { area, availableDate, propertyType } = this.form
    this.state.form['area'] = area.value
    this.state.form['availableDate'] = availableDate.value
    this.state.form['propertyType'] = propertyType.value
    console.log(propertyType)
    console.log(this.state.form)
  }

  render() {
    return (
      <form id={styles.ownerForm} ref={form => this.form = form} onSubmit={this.handleSubmit.bind(this)} >

        <p><FormattedMessage id="form.propertyType.label" /> :</p>
        {this.props.propertyType.map(type => (<PropertyType key={type._id} propertyType={type.name} />))}

        <p><FormattedMessage id="form.area.label" /> :</p>
        <Input type="number" name="area" />

        <p><FormattedMessage id="form.availableDate.label" /> :</p>
        <Input type="date" name="availableDate" />

        <br />
        <br />

        <Input type="submit" name="submit" value={this.props.intl.messages['form.submit']} />
      </form>
    )
  }
}

export default injectIntl(PropertyForm)