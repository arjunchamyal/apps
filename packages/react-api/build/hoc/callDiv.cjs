"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withCallDiv;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _call = _interopRequireDefault(require("./call.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function withCallDiv(endpoint) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (render) {
    let defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    function Inner(_ref) {
      let {
        callResult,
        callUpdated,
        children,
        className = defaultProps.className,
        label = ''
      } = _ref;
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", _objectSpread(_objectSpread({}, defaultProps), {}, {
        className: [className || '', callUpdated ? 'rx--updated' : undefined].join(' '),
        children: [label, render(callResult), children]
      }));
    }

    return (0, _call.default)(endpoint, _objectSpread(_objectSpread({}, options), {}, {
      propName: 'callResult'
    }))(Inner);
  };
}