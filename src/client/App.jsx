import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import 'clientAssets/app.less';

import Header from './components/Header'
import Footer from './components/Footer'
import Routes from './routes'

const App = ({ locale }) => (
  <div className={locale === 'he' ? 'rtl' : ''}>
    <Header />
    <div id="main-container" >
      <Routes />
    </div>
    <Footer />
  </div>
);

const mapStateToProps = (store) => ({
  locale: store.intl.locale
})

export default withRouter(connect(
  mapStateToProps,
)(App))
