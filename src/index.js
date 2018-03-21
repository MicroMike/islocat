import http from 'http'
import app from './server/server'

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/mern-starter'

const server = dev ? http.createServer(app) : app

server.listen(port, () => {
  console.log('Server started on port:' + port)
})

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');
  let currentApp = app;

  module.hot.accept('./server/server', () => {
    console.log('🔁  HMR Reloading `./server`...');
    server.removeListener('request', currentApp);
    const newApp = require('./server/server').default;
    server.on('request', newApp);
    currentApp = newApp;
  });
}