// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useToggle } from '@axia-js/react-hooks';
import Icon from "./Icon.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Inset({
  children,
  className = '',
  header,
  href,
  isCollapsible,
  isError,
  isSuccess,
  withBottomMargin,
  withTopMargin
}) {
  const history = useHistory();
  const [isCollapsed, toggleCollapsed] = useToggle();

  const _onClick = useCallback(() => {
    href && history.push(href);
  }, [history, href]);

  if (!children) {
    return null;
  }

  return /*#__PURE__*/_jsxs("div", {
    className: `ui--Inset ${href ? ' as-link' : ''}${isCollapsible ? ' collapsible' : ''}${isError && !isSuccess ? ' error' : ''}${!isError && isSuccess ? ' success' : ''}${withBottomMargin ? ' bottom-margin' : ''}${withTopMargin ? ' top-margin' : ''} ${className}`,
    children: [isCollapsible && /*#__PURE__*/_jsxs("div", {
      className: "header",
      onClick: toggleCollapsed,
      children: [/*#__PURE__*/_jsx("h3", {
        children: header
      }), /*#__PURE__*/_jsx(Icon, {
        className: isCollapsed ? 'collapsed' : '',
        icon: "angle-up"
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: `children${isCollapsible && isCollapsed ? ' collapsed' : ''}`,
      onClick: _onClick,
      children: children
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Inset).withConfig({
  displayName: "Inset",
  componentId: "sc-byyc6d-0"
})(["&{box-shadow:0 3px 3px rgba(0,0,0,.2);position:relative;background:#fefefe;padding:1rem;transition:all 0.2s;display:flex;flex-direction:column;&.bottom-margin{margin-bottom:2rem;}&.top-margin{margin-top:2rem;}&.error{background:rgba(255,0,0,0.05);&,h1,h2,h3,h4,h5,h6,p{color:rgba(156,0,0) !important;}}&.success{border:1px solid rgb(168,255,136);background:rgba(0,255,0,0.05);&,h1,h2,h3,h4,h5,h6,p{color:rgba(34,125,0) !important;}}.header{cursor:pointer;height:2rem;width:100%;h3{line-height:2rem;margin-bottom:0;}.icon{height:4rem;width:4rem;font-size:2rem;color:rgba(0,0,0,0.35);position:absolute;right:0;top:0;line-height:4rem;transition:all 0.2s;transform-origin:center center;&.collapsed{transform:rotate(180deg);}}}.children{&.collapsed{display:none;}}&.as-link{cursor:pointer;&:hover{box-shadow:0 5px 5px rgba(0,0,0,.2);transform:translateY(-2px);}}}"]));