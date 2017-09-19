/* @flow */

import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'

type Props = {
  onClick?: Function,
  target?: string,
  replace?: boolean,
  to: string | Object,
  innerRef?: string | Function
}

type Route = {
  match: string => ?Object,
  valuesToParams: (Array<string>) => Object,
  getHref: (?Object) => string,
  getAs: (?Object) => string,
  getUrls: (?Object) => { as: string, href: string }
}

type Context = {
  Routes: {
    routes: Array<Route>,
    match: string => ?{
      params: Object,
      query: Object,
      route: Route
    }
  },
  routerProps: {
    basename?: string
  }
}

function Link (props: Props, context: Context) {
  let to = props.to
  if (typeof to === 'string') {
    const toWithBase = context.routerProps.basename ? context.routerProps.basename + to : to
    const routeMatch = context.Routes.match(toWithBase)
    if (routeMatch) {
      const urls = routeMatch.route.getUrls(routeMatch.params)
      to = {
        pathname: to,
        state: { url: urls.href, as: urls.as },
      }
    }
  }

  return <ReactRouterLink {...props} to={to} />
}

Link.contextTypes = {
  Routes: PropTypes.object,
  routerProps: PropTypes.object,
}

export default Link
