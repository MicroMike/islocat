import App from './client/App'
import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { Provider } from 'react-redux';
import { hydrate } from 'react-dom';

import newStore from './client/store';
import IntlWrapper from './modules/Intl/IntlWrapper';

const store = newStore(window.__INITIAL_STATE__)

hydrate(
  <Provider store={store} >
    <IntlWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </IntlWrapper>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
