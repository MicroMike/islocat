import http from 'http'
import mongoose from 'mongoose'
import app from './server/server'

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const mongoURL = process.env.RAZZLE_MONGO_URL || 'mongodb://localhost:27017/mern-starter'

const server = dev ? http.createServer(app) : app

// MongoDB Connection
mongoose.connect(mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});

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