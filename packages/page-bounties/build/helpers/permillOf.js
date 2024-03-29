// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { BN_MILLION } from '@axia-js/util';
export function permillOf(value, perMill) {
  return value.mul(perMill).div(BN_MILLION);
}