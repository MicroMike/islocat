import App from './client/App'
import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { Provider } from 'react-redux';
import { hydrate } from 'react-dom';

import store from './client/store'
import IntlWrapper from './client/modules/Intl/IntlWrapper';

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
