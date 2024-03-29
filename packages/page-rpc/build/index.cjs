"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _reactComponents = require("@axia-js/react-components");

var _index = _interopRequireDefault(require("./Rpc/index.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-rpc authors & contributors
// SPDX-License-Identifier: Apache-2.0
function RpcApp(_ref) {
  let {
    basePath
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const itemsRef = (0, _react.useRef)([{
    isRoot: true,
    name: 'rpc',
    text: t('Submission')
  }]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
    className: "toolbox--App",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tabs, {
      basePath: basePath,
      items: itemsRef.current
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Switch, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {})
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(RpcApp);

exports.default = _default;