import Express from 'express'

import { handleRender } from './render'
import routes from './routes'

const app = Express()

app.disable('x-powered-by')

//Serve static files
app.use('/static', Express.static('static'))

app.use('/api', routes)

// This is fired every time the server side receives a request
app.get('*', handleRender)

export default app
