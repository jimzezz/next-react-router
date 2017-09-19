'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Link(props, context) {
  var to = props.to;
  if (typeof to === 'string') {
    var toWithBase = context.routerProps.basename ? context.routerProps.basename + to : to;
    var routeMatch = context.Routes.match(toWithBase);
    if (routeMatch) {
      var urls = routeMatch.route.getUrls(routeMatch.params);
      to = {
        pathname: to,
        state: { url: urls.href, as: urls.as }
      };
    }
  }

  return _react2.default.createElement(_reactRouterDom.Link, _extends({}, props, { to: to }));
}

Link.contextTypes = {
  Routes: _propTypes2.default.object,
  routerProps: _propTypes2.default.object
};

exports.default = Link;