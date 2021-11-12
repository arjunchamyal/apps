"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Body = _interopRequireDefault(require("./Body.cjs"));

var _Foot = _interopRequireDefault(require("./Foot.cjs"));

var _Head = _interopRequireDefault(require("./Head.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function extractBodyChildren(children) {
  if (!Array.isArray(children)) {
    return [!children, children];
  }

  const kids = children.filter(child => !!child);
  const isEmpty = kids.length === 0;
  return [isEmpty, isEmpty ? null : kids];
}

function Table({
  children,
  className = '',
  empty,
  emptySpinner,
  filter,
  footer,
  header,
  isFixed,
  legend,
  noBodyTag,
  withCollapsibleRows = false
}) {
  const [isEmpty, bodyChildren] = extractBodyChildren(children);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--Table ${className}`,
    children: [legend, /*#__PURE__*/(0, _jsxRuntime.jsxs)("table", {
      className: `${isFixed && !isEmpty ? 'isFixed' : 'isNotFixed'} highlight--bg-faint${withCollapsibleRows ? ' withCollapsibleRows' : ''}`,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Head.default, {
        filter: filter,
        header: header,
        isEmpty: isEmpty
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Body.default, {
        empty: empty,
        emptySpinner: emptySpinner,
        noBodyTag: noBodyTag,
        children: bodyChildren
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Foot.default, {
        footer: footer,
        isEmpty: isEmpty
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Table).withConfig({
  displayName: "Table",
  componentId: "sc-py8r9b-0"
})(["margin-bottom:1.5rem;max-width:100%;width:100%;table{border-spacing:0;max-width:100%;overflow:hidden;position:relative;width:100%;z-index:1;&.isFixed{table-layout:fixed;}tr{max-width:100%;width:100%;td,&:not(.filter) th{&:first-child{padding-left:1.5rem;}&:last-child{padding-right:0.75rem;}&.all{width:100%;&:not(.overflow){word-break:break-word;}summary{white-space:normal;}}}}&.withCollapsibleRows tbody tr{background-color:unset;&:nth-child(4n - 2),&:nth-child(4n - 3){background-color:var(--bg-table);}}}tbody{position:relative;td{border-bottom:1px solid var(--border-table);padding:0.5rem 1rem;text-align:left;vertical-align:middle;&:first-child{border-left:1px solid var(--border-table);}&:last-child{border-right:1px solid var(--border-table);}label{display:block !important;white-space:nowrap;}div.empty{opacity:0.6;padding:0.25rem;}.ui--Spinner{margin:0 auto;.text{margin-bottom:0;}}&.address{min-width:11rem;overflow-x:hidden;}&.badge{padding:0.5rem;}&.button{padding:0.25rem 0.5rem;text-align:right;white-space:nowrap;> *{vertical-align:middle;}.ui--Toggle{display:inline-block;white-space:nowrap;label{display:inline-block !important;}}}&.combined{border-top-width:0;}&.expand{&:not(.left){text-align:right;}.ui--Expander + .ui--Expander{margin-top:0.375rem;}}&.hash{font:var(--font-mono);}&.links{padding:0.5rem 0.75rem;text-align:center;width:0;}&.no-pad-left{padding-left:0.125rem;}&.no-pad-right{padding-right:0.125rem;}&.no-pad-top{padding-top:0.125rem;}&.number{text-align:right;}&.relative{position:relative;}&.overflow{max-width:0;overflow:hidden;text-overflow:ellipsis;word-break:none;}&.start{text-align:left;}&.together{white-space:nowrap;}&.top{vertical-align:top;}&.middle{text-align:center;}&.mini{padding:0 !important;width:fit-content;white-space:normal;> div{margin-right:0.75rem;max-width:3.8rem;min-width:3.8rem;}}&.upper{text-transform:uppercase;}&.favorite .ui--Icon.isSelected{color:darkorange;}.ui--Button-Group .ui--Button:not(.isToplevel){margin:0;}}tr{&.hasOddRowColoring,&:nth-child(odd){background:var(--bg-table);}&:first-child{td{border-top:0.25rem solid var(--bg-page);}td:first-child{border-top-left-radius:0.25rem;}td:last-child{border-top-right-radius:0.25rem;}}&:last-child{td{border-bottom:1px solid var(--border-table);&:first-child{border-bottom-left-radius:0.25rem;}:last-child{border-bottom-right-radius:0.25rem;}}}&.transparent{background:transparent;}&.noBorder td{border-bottom:1px solid transparent;padding-bottom:0 !important;}.ui--Button-Group{margin:0;}.ui--Button:not(.isIcon):not(:hover){background:transparent !important;box-shadow:none !important;}.ui.toggle.checkbox input:checked ~ .box:before,.ui.toggle.checkbox input:checked ~ label:before{background-color:#eee !important;}}}"]));

exports.default = _default;