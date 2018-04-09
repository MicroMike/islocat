import React, { Component } from 'react';
import Helmet from 'react-helmet';

import Form from '../components/PropertyForm';

export class OwnerPage extends Component {
  render() {
    return (
      <div>
        <Helmet title="Owner" />
        <Form />
      </div>
    );
  }
}

export default OwnerPage;
