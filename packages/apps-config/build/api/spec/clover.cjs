"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
// structs need to be in order

/* eslint-disable sort-keys */
const definitions = {
  types: [{
    // on all versions
    minmax: [0, undefined],
    types: {
      Amount: 'i128',
      Keys: 'SessionKeys4',
      AmountOf: 'Amount',
      Balance: 'u128',
      Rate: 'FixedU128',
      Ratio: 'FixedU128',
      EcdsaSignature: '[u8; 65]',
      EvmAddress: 'H160',
      EthereumTxHash: 'H256'
    }
  }]
};
var _default = definitions;
exports.default = _default;