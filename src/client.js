import App from './client/App'
import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { Provider } from 'react-redux';
import { hydrate } from 'react-dom';

import newStore from './client/store';

const store = newStore(window.__INITIAL_STATE__)

store.subscribe(() => {
  console.log(store.getState())
})

hydrate(
  <Provider store={store} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
