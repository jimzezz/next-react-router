/* @flow */

import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import { omitKeys } from './utils'

type Props = {
  onClick?: Function,
  target?: string,
  replace?: boolean,
  to: string | Object,
  innerRef?: string | Function,
  shallow: boolean
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
    match: string => {
      params: Object,
      query: Object,
      route?: Route
    }
  },
  routerProps: {
    basename?: string
  }
}

const ownKeys = ['shallow']

function Link (props: Props, context: Context) {
  let to = props.to
  if (typeof to === 'string') {
    const toWithBase = context.routerProps.basename ? context.routerProps.basename + to : to
    const routeMatch = context.Routes.match(toWithBase)
    if (routeMatch.route) {
      const urls = routeMatch.route.getUrls(routeMatch.params)
      to = {
        pathname: to,
        state: { url: urls.href, as: urls.as, options: { shallow: props.shallow } },
      }
    }
  }

  return <ReactRouterLink {...omitKeys(ownKeys, props)} to={to} />
}

Link.defaultProps = {
  shallow: true,
}

Link.contextTypes = {
  Routes: PropTypes.object,
  routerProps: PropTypes.object,
}

export default Link
