import Express from 'express'

import { handleRender } from './render'
import routes from './routes'

const app = Express()

app.disable('x-powered-by')

let staticFolder = process.env.NODE_ENV === 'production' ? 'build/public/static' : 'static'

//Serve static files
app.use('/static', Express.static(staticFolder))

app.use('/api', routes)

// This is fired every time the server side receives a request
app.get('*', handleRender)

export default app
