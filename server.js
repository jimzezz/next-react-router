/* @flow */

const express = require('express')
const next = require('next')
const routes = require('./routes')

const port = process.env.PORT || 3000

const server = express()

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
  server.use(handler)

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`) // eslint-disable-line
  })
})
