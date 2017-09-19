/* @flow */

import React from 'react'
import { Route } from 'react-router-dom'
import Head from 'next/head'

import Link from '../src/Link'
import Routes, { Link as NextLink } from '../routes'
import withReactRouter from '../src/withReactRouter'

function ShowPath ({ match }: { match: Object }) {
  return <code>{match.params.segment}</code>
}

function WithReactRouterExample () {
  return (
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
            <NextLink href='/isomorphic-router' prefetch>
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
  )
}

export default withReactRouter(WithReactRouterExample, Routes, { basename: '/with-react-router' })
