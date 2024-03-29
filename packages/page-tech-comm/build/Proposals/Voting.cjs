"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Voting(_ref) {
  let {
    hash,
    members,
    prime,
    proposalId,
    type
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    hasAccounts
  } = (0, _reactHooks.useAccounts)();
  const [accountId, setAccountId] = (0, _react.useState)(null);
  const [isVotingOpen, toggleVoting] = (0, _reactHooks.useToggle)();
  const modLocation = (0, _reactHooks.useCollectiveInstance)(type);

  if (!modLocation || !hasAccounts) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [isVotingOpen && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      header: t('Vote on proposal'),
      onClose: toggleVoting,
      size: "small",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.VoteAccount, {
          filter: members,
          onChange: setAccountId
        }), accountId === (prime === null || prime === void 0 ? void 0 : prime.toString()) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkWarning, {
          content: t('You are voting with this collective\'s prime account. The vote will be the default outcome in case of any abstentions.')
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Actions, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: accountId,
          icon: "ban",
          label: t('Vote Nay'),
          onStart: toggleVoting,
          params: [hash, proposalId, false],
          tx: api.tx[modLocation].vote
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: accountId,
          icon: "check",
          label: t('Vote Aye'),
          onStart: toggleVoting,
          params: [hash, proposalId, true],
          tx: api.tx[modLocation].vote
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "check",
      label: t('Vote'),
      onClick: toggleVoting
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Voting);

exports.default = _default;