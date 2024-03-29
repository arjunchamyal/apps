"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactParams = _interopRequireDefault(require("@axia-js/react-params"));

var _create = require("@axia-js/types/create");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
function formatTuple(tuple) {
  const params = tuple.Types.map(type => ({
    type: (0, _create.getTypeDef)(type)
  }));
  const values = tuple.toArray().map(value => ({
    isValid: true,
    value
  }));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactParams.default, {
    isDisabled: true,
    params: params,
    values: values
  });
}

function JustificationList(_ref) {
  let {
    value
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const headerRef = (0, _react.useRef)([[t('justifications'), 'start']]);
  const justifications = value.unwrapOr(null);

  if (!justifications) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
    empty: t('No justifications available'),
    header: headerRef.current,
    children: justifications === null || justifications === void 0 ? void 0 : justifications.map((justification, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)("tr", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "overflow",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
          summary: justification[0].toString(),
          children: formatTuple(justification)
        })
      })
    }, `justification:${index}`))
  });
}

var _default = /*#__PURE__*/_react.default.memo(JustificationList);

exports.default = _default;