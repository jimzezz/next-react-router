'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _IsomorphicRouter = require('./IsomorphicRouter');

var _IsomorphicRouter2 = _interopRequireDefault(_IsomorphicRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var withReactRouter = function withReactRouter(WrappedComponent, Routes) {
  var _class, _temp;

  var routerProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _temp = _class = function (_Component) {
    _inherits(ReactRouterWrapper, _Component);

    function ReactRouterWrapper() {
      _classCallCheck(this, ReactRouterWrapper);

      return _possibleConstructorReturn(this, (ReactRouterWrapper.__proto__ || Object.getPrototypeOf(ReactRouterWrapper)).apply(this, arguments));
    }

    _createClass(ReactRouterWrapper, [{
      key: 'render',
      value: function render() {
        var requestUrl = this.props.requestUrl;
        return _react2.default.createElement(
          _IsomorphicRouter2.default,
          _extends({}, routerProps, { location: requestUrl, Routes: Routes }),
          _react2.default.createElement(WrappedComponent, this.props)
        );
      }
    }]);

    return ReactRouterWrapper;
  }(_react.Component), _class.getInitialProps = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
      var props;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!WrappedComponent.getInitialProps) {
                _context.next = 6;
                break;
              }

              _context.next = 3;
              return WrappedComponent.getInitialProps(ctx);

            case 3:
              _context.t0 = _context.sent;
              _context.next = 7;
              break;

            case 6:
              _context.t0 = {};

            case 7:
              props = _context.t0;
              return _context.abrupt('return', _extends({}, props, { requestUrl: ctx.req ? ctx.req.url : null }));

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x2) {
      return _ref.apply(this, arguments);
    };
  }(), _temp;
};

exports.default = withReactRouter;