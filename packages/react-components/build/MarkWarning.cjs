"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Icon = _interopRequireDefault(require("./Icon.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function MarkWarning(_ref) {
  let {
    children,
    className = '',
    content
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("article", {
    className: `mark warning ${className}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Icon.default, {
      icon: "exclamation-triangle"
    }), content, children]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(MarkWarning).withConfig({
  displayName: "MarkWarning",
  componentId: "sc-krwrbf-0"
})([".ui--Icon{color:rgba(255,196,12,1);margin-right:0.5rem;}"]));

exports.default = _default;