/* @flow */

import Router from 'next/router'
import * as React from 'react'
import { BrowserRouter, StaticRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import onPopStatePatch from './patch'

type Props = {
  location: ?string,
  children: React.Node,
  Routes: Object
}

const ownKeys = ['location', 'children', 'Routes']
function omitKeys (keys: Array<string>, source: Object): Object {
  const clone = { ...source }

  keys.forEach((key) => {
    delete clone[key]
  })

  return clone
}

class IsomorphicRouter extends React.Component<Props> {
  static childContextTypes = {
    Routes: PropTypes.object,
    routerProps: PropTypes.object,
  }

  constructor (props: Props) {
    super(props)

    if (Router.router) {
      // The history package attaches route state in a way that is incompatible with the way that
      // the next.js router attaches route state, monkey-patch is performed here. Be sure to see
      // the patch.js file for more information on what's going on.
      const oldOnPopState = Router.router.onPopState
      window.removeEventListener('popstate', oldOnPopState)
      Router.router.onPopState = onPopStatePatch.bind(Router.router)
      window.addEventListener('popstate', Router.router.onPopState)
    }
  }

  getChildContext () {
    return {
      Routes: this.props.Routes,
      routerProps: omitKeys(ownKeys, this.props),
    }
  }

  props: Props

  render () {
    const { location, children } = this.props
    const isServer = typeof window === 'undefined'
    const routerProps = omitKeys(ownKeys, this.props)

    if (isServer) {
      return (
        <StaticRouter location={location} context={{}} {...routerProps}>
          {children}
        </StaticRouter>
      )
    }

    return <BrowserRouter {...routerProps}>{children}</BrowserRouter>
  }
}

export default IsomorphicRouter
