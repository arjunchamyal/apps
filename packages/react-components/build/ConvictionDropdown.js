// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useRef } from 'react';
import { useApi, useBlockTime } from '@axia-js/react-hooks';
import { BN_THOUSAND } from '@axia-js/util';
import Dropdown from "./Dropdown.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
const CONVICTIONS = [1, 2, 4, 8, 16, 32].map((lock, index) => [index + 1, lock, new BN(lock)]);
const SEC_DAY = 60 * 60 * 24;

function createOptions(api, t, blockTime) {
  return [{
    text: t('0.1x voting balance, no lockup period'),
    value: 0
  }, ...CONVICTIONS.map(([value, lock, bnLock]) => ({
    text: t('{{value}}x voting balance, locked for {{lock}}x enactment ({{period}} days)', {
      replace: {
        lock,
        period: (bnLock.mul(api.consts.democracy.enactmentPeriod.muln(blockTime).div(BN_THOUSAND)).toNumber() / SEC_DAY).toFixed(2),
        value
      }
    }),
    value
  }))];
}

function Convictions({
  className = '',
  help,
  label,
  onChange,
  value
}) {
  const {
    api
  } = useApi();
  const {
    t
  } = useTranslation();
  const [blockTime] = useBlockTime();
  const optionsRef = useRef(createOptions(api, t, blockTime));
  return /*#__PURE__*/_jsx(Dropdown, {
    className: className,
    help: help,
    label: label,
    onChange: onChange,
    options: optionsRef.current,
    value: value
  });
}

export default /*#__PURE__*/React.memo(Convictions);