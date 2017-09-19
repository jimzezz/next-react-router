'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _router = require('next/router');

var _router2 = _interopRequireDefault(_router);

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactRouterDom = require('react-router-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _patch = require('./patch');

var _patch2 = _interopRequireDefault(_patch);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ownKeys = ['location', 'children', 'Routes'];
function omitKeys(keys, source) {
  var clone = _extends({}, source);

  keys.forEach(function (key) {
    delete clone[key];
  });

  return clone;
}

var IsomorphicRouter = function (_React$Component) {
  _inherits(IsomorphicRouter, _React$Component);

  function IsomorphicRouter(props) {
    _classCallCheck(this, IsomorphicRouter);

    var _this = _possibleConstructorReturn(this, (IsomorphicRouter.__proto__ || Object.getPrototypeOf(IsomorphicRouter)).call(this, props));

    if (_router2.default.router) {
      // The history package attaches route state in a way that is incompatible with the way that
      // the next.js router attaches route state, monkey-patch is performed here. Be sure to see
      // the patch.js file for more information on what's going on.
      var oldOnPopState = _router2.default.router.onPopState;
      window.removeEventListener('popstate', oldOnPopState);
      _router2.default.router.onPopState = _patch2.default.bind(_router2.default.router);
      window.addEventListener('popstate', _router2.default.router.onPopState);
    }
    return _this;
  }

  _createClass(IsomorphicRouter, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        Routes: this.props.Routes,
        routerProps: omitKeys(ownKeys, this.props)
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          location = _props.location,
          children = _props.children;

      var isServer = typeof window === 'undefined';
      var routerProps = omitKeys(ownKeys, this.props);

      if (isServer) {
        return React.createElement(
          _reactRouterDom.StaticRouter,
          _extends({ location: location, context: {} }, routerProps),
          children
        );
      }

      return React.createElement(
        _reactRouterDom.BrowserRouter,
        routerProps,
        children
      );
    }
  }]);

  return IsomorphicRouter;
}(React.Component);

IsomorphicRouter.childContextTypes = {
  Routes: _propTypes2.default.object,
  routerProps: _propTypes2.default.object
};
exports.default = IsomorphicRouter;