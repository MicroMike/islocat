import React from 'react'

import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import IntlWrapper from '../modules/Intl/IntlWrapper'
import { switchLanguage } from '../modules/Intl/IntlActions'
// import routes from '../client/routes'
import newStore from '../client/store'
import App from '../client/App'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const renderFullPage = (markup, preloadedState) => {
  return `
    <!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${assets.client.css
      ? `<link rel="stylesheet" href="${assets.client.css}">`
      : ''}
        ${process.env.NODE_ENV === 'production'
      ? `<script src="${assets.client.js}" defer></script>`
      : `<script src="${assets.client.js}" defer crossorigin></script>`}
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
    <script type="text/javascript">window.__INITIAL_STATE__ = ${JSON.stringify(preloadedState)}</script>
  </html>
  `
}

export const handleRender = (req, res) => {
  const store = newStore()
  store.dispatch(switchLanguage(req.headers['accept-language'].split('-')[0]))

  const app = (
    <Provider store={store} >
      <IntlWrapper>
        <StaticRouter location={req.url} context={{}}>
          <App />
        </StaticRouter>
      </IntlWrapper>
    </Provider>
  )
  renderToString(app)

  Promise.all(store.getState().prefetch).then(() => {
    // Render the component to a string
    const html = renderToString(app)

    // Grab the initial state from our Redux store
    let preloadedState = store.getState()
    let { prefetch, ...clientStore } = preloadedState

    // Send the rendered page back to the client
    res.send(renderFullPage(html, clientStore))
  })
}