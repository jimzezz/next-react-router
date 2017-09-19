const routes = (module.exports = require('next-routes')())

routes.add('/with-react-router/:segment', 'with-react-router')
routes.add('/isomorphic-router/:segment', 'isomorphic-router')
