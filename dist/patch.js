'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
var onPopStatePatch = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
    var pathname, query, state, _state, url, as, options;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (e.state) {
              _context.next = 4;
              break;
            }

            // We get state as undefined for two reasons.
            //  1. With older safari (< 8) and older chrome (< 34)
            //  2. When the URL changed with #
            //
            // In the both cases, we don't need to proceed and change the route.
            // (as it's already changed)
            // But we can simply replace the state with the new changes.
            // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
            // So, doing the following for (1) does no harm.
            pathname = this.pathname, query = this.query;

            this.changeState('replaceState', (0, _url.format)({ pathname: pathname, query: query }), (0, _utils.getURL)());
            return _context.abrupt('return');

          case 4:
            state = e.state;
            // Check for nested state created by the `history` package

            if (state.state) {
              state = state.state;
            }
            _state = state, url = _state.url, as = _state.as, options = _state.options;


            this.replace(url, as, options);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function onPopStatePatch(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _utils = require('next/dist/lib/utils');

var _url = require('url');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = onPopStatePatch;