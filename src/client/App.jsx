import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import { injectIntl } from 'react-intl'

import './App.less';

import Header from './components/Header'
import Footer from './components/Footer'

import Home from '../modules/Home/Home'
import Owner from '../modules/Property/pages/OwnerPage'

const App = ({ intl }) => (
  <div className={intl.locale === 'he' ? 'rtl' : ''}>
    <Header />
    <div id="main-container" >
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/owner" component={Owner} />
      </Switch>
    </div>
    <Footer />
  </div>
);

export default injectIntl(App);
