/* @flow */

import React from 'react'
import { Route } from 'react-router-dom'
import Head from 'next/head'
import Routes, { Link as NextLink } from '../routes'

import IsomorphicRouter from '../src/IsomorphicRouter'
import Link from '../src/Link'

function ShowPath ({ match }: { match: Object }) {
  return <code>{match.params.segment}</code>
}

function IsomorphicRouterExample (props: { requestUrl: string }) {
  return (
    <IsomorphicRouter basename='/isomorphic-router' location={props.requestUrl} Routes={Routes}>
      <div>
        <Head>
          <link
            rel='stylesheet'
            href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css'
            integrity='sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M'
            crossOrigin='anonymous'
          />
        </Head>
        <div className='container'>
          <h1 className='display-4'>With React Router Example</h1>
          <ul className='nav'>
            <li className='nav-item'>
              <NextLink href='/with-react-router' prefetch>
                <a className='nav-link'>Next Link</a>
              </NextLink>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/check'>
                check
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/out'>
                out
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/these'>
                these
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/routes'>
                routes
              </Link>
            </li>
          </ul>
          <Route exact path='/:segment' component={ShowPath} />
        </div>
      </div>
    </IsomorphicRouter>
  )
}

// Be sure to return `ctx.url` as a key OTHER than `url`. The `next-routes` injects a `url`
// parameter which will override a url parameter returned here.
// `ctx.url` returns a string (which we want), while the `next-routes` url is an object with parsed
// url segments (which is useful / necessary for dynamic routing, but not what we want for
// react-router).
IsomorphicRouterExample.getInitialProps = ctx => ({
  requestUrl: ctx.req ? ctx.req.url : null,
})

export default IsomorphicRouterExample
