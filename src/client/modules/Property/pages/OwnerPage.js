import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import Form from '../components/PropertyForm';

import { fetchPropertyType } from '../PropertyAction';
import { getPropertyType } from '../PropertyReducer';

export class OwnerPage extends Component {
  componentDidMount() {
    if (this.props.propertyType.length === 0) {
      this.props.dispatch(fetchPropertyType());
    }
  }

  render() {
    return (
      <div>
        <Helmet title="Owner" />
        <Form propertyType={this.props.propertyType} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in server side.
OwnerPage.need = [() => {
  return fetchPropertyType();
}];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    propertyType: getPropertyType(state),
  };
}

export default connect(mapStateToProps)(OwnerPage);
