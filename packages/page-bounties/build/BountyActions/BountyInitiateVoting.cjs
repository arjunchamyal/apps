"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireWildcard(require("react"));

var _appsConfig = require("@axia-js/apps-config");

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _index = require("../helpers/index.cjs");

var _index2 = require("../hooks/index.cjs");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
const BOUNTY_METHODS = ['approveBounty', 'closeBounty'];

function BountyInitiateVoting(_ref) {
  let {
    description,
    index,
    proposals
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    isMember,
    members
  } = (0, _reactHooks.useCollectiveMembers)('council');
  const councilMod = (0, _reactHooks.useCollectiveInstance)('council');
  const {
    approveBounty,
    closeBounty
  } = (0, _index2.useBounties)();
  const [isOpen, toggleOpen] = (0, _reactHooks.useToggle)();
  const [accountId, setAccountId] = (0, _react.useState)(null);
  const [threshold, setThreshold] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    members && setThreshold(new _bn.default(Math.ceil(members.length * (0, _appsConfig.getTreasuryProposalThreshold)(api))));
  }, [api, members]);
  const approveBountyProposal = (0, _react.useRef)(approveBounty(index));
  const closeBountyProposal = (0, _react.useRef)(closeBounty(index));
  const isVotingInitiated = (0, _react.useMemo)(() => (proposals === null || proposals === void 0 ? void 0 : proposals.filter(_ref2 => {
    let {
      proposal
    } = _ref2;
    return BOUNTY_METHODS.includes(proposal.method);
  }).length) !== 0, [proposals]);
  return isMember && !isVotingInitiated && councilMod ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "step-forward",
      isDisabled: false,
      label: t('Initiate voting'),
      onClick: toggleOpen
    }), isOpen && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      header: `${t('Initiate voting')} - "${(0, _index.truncateTitle)(description, 30)}"`,
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Content, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The council member that will create a motion, submission equates to an "aye" vote for chosen option.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            filter: members,
            help: t('Select the council member account you wish to use to create a motion for the Bounty.'),
            label: t('vote with account'),
            onChange: setAccountId,
            type: "account",
            withLabel: true
          })
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Actions, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: accountId,
          icon: "check",
          isDisabled: false,
          label: t('Approve'),
          onStart: toggleOpen,
          params: [threshold, approveBountyProposal.current, approveBountyProposal.current.length],
          tx: api.tx[councilMod].propose
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: accountId,
          icon: "ban",
          isDisabled: false,
          label: t('Reject'),
          onStart: toggleOpen,
          params: [threshold, closeBountyProposal.current, closeBountyProposal.current.length],
          tx: api.tx[councilMod].propose
        })]
      })]
    })]
  }) : null;
}

var _default = /*#__PURE__*/_react.default.memo(BountyInitiateVoting);

exports.default = _default;