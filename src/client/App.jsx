import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import './styles.css';

import Header from './components/Header'
import Footer from './components/Footer'

import Home from './modules/Home/Home'

const App = () => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
    <Footer />
  </div>
);

export default App;
