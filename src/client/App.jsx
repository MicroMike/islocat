import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import { connect } from 'react-redux'

import './styles.css';

import Header from './components/Header'
import Footer from './components/Footer'

import Home from '../modules/Home/Home'
import Owner from '../modules/Property/pages/OwnerPage'

const App = ({ locale }) => (
  <div>
    <Header />
    <div id="main-container" className={locale === 'he' ? 'rtl' : ''} >
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/owner" component={Owner} />
      </Switch>
    </div>
    <Footer />
  </div>
);

const mapStateToProps = ({ intl }) => ({
  locale: intl.locale
})

export default connect(mapStateToProps)(App);
