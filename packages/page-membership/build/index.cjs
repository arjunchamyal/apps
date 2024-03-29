"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
Object.defineProperty(exports, "useCounter", {
  enumerable: true,
  get: function () {
    return _useCounter.default;
  }
});

var _react = _interopRequireDefault(require("react"));

var _App = _interopRequireDefault(require("@axia-js/app-tech-comm/App"));

var _jsxRuntime = require("react/jsx-runtime");

var _useCounter = _interopRequireDefault(require("./useCounter.cjs"));

// Copyright 2017-2021 @axia-js/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0
function TechComm(_ref) {
  let {
    basePath,
    className
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_App.default, {
    basePath: basePath,
    className: className,
    type: "membership"
  });
}

var _default = /*#__PURE__*/_react.default.memo(TechComm);

exports.default = _default;