/* @flow */

import React, { Component } from 'react'
import IsmorphicRouter from './IsomorphicRouter'

declare type NextPage<P> = (
  | React$StatelessFunctionalComponent<P>
  | Class<React$Component<P, any>>) & { getInitialProps?: (ctx: Object) => Promise<*> }

type Props = {
  requestUrl: ?string
}

const withReactRouter = (
  WrappedComponent: NextPage<*>,
  Routes: Object,
  routerProps?: Object = {}
) =>
  class ReactRouterWrapper extends Component<Props> {
    static getInitialProps = async (ctx) => {
      const props = WrappedComponent.getInitialProps
        ? await WrappedComponent.getInitialProps(ctx)
        : {}

      return { ...props, requestUrl: ctx.req ? ctx.req.url : null }
    }

    props: Props

    render () {
      const requestUrl = this.props.requestUrl
      return (
        <IsmorphicRouter {...routerProps} location={requestUrl} Routes={Routes}>
          <WrappedComponent {...this.props} />
        </IsmorphicRouter>
      )
    }
  }

export default withReactRouter
