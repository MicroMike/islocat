import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import Home from '../modules/Home/Home'
import Owner from '../modules/Property/pages/OwnerPage'

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/owner" component={Owner} />
  </Switch>
)