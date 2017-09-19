/* @flow */

import { getURL } from 'next/dist/lib/utils'
import { format } from 'url'

// Next.js attaches route state to each history operation so that it can reason about which page it
// needs to load upon pressing of the back-forward buttons.
// @see
// https://github.com/zeit/next.js/blob/c97aca50e509fac66ef380f6435c556d25290d27/lib/router/router.js#L188
//
// Next.js Router expects this route state to be available directly in the state object as seen^,
// while the history library used by react-router nests state within a 'state' key
// @see
// https://github.com/ReactTraining/history/blob/93992e8596e2cf97024b69915eb45b4da871c736/modules/createBrowserHistory.js#L172
// https://github.com/zeit/next.js/blob/c97aca50e509fac66ef380f6435c556d25290d27/lib/router/router.js#L62
//
// As such, we need to monkey-patch the onPopState method on the Next Router to look for nested
// state :(
async function onPopStatePatch (e: Object) {
  // The following logic is taken directly from the next.js router
  // https://github.com/zeit/next.js/blob/c97aca50e509fac66ef380f6435c556d25290d27/lib/router/router.js#L46
  if (!e.state) {
    // We get state as undefined for two reasons.
    //  1. With older safari (< 8) and older chrome (< 34)
    //  2. When the URL changed with #
    //
    // In the both cases, we don't need to proceed and change the route.
    // (as it's already changed)
    // But we can simply replace the state with the new changes.
    // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
    // So, doing the following for (1) does no harm.
    const { pathname, query } = this
    this.changeState('replaceState', format({ pathname, query }), getURL())
    return
  }

  let state = e.state
  // Check for nested state created by the `history` package
  if (state.state) {
    state = state.state
  }
  const { url, as, options } = state

  this.replace(url, as, options)
}

export default onPopStatePatch
