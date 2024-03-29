// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { KULUPU_GENESIS, AXIALUNAR_GENESIS, AXIA_GENESIS } from "../constants.js"; // normal fast-track proposals

const FAST_TRACK = {
  default: 2 / 3
}; // in the case where block < fastTrackVotingPeriod

const FAST_TRACK_NO_DELAY = {
  default: 1
};
const PROPOSE = {
  [KULUPU_GENESIS]: 1,
  [AXIALUNAR_GENESIS]: 1 / 2,
  [AXIA_GENESIS]: 3 / 5,
  default: 1 / 2
};
const SLASH = {
  [AXIALUNAR_GENESIS]: 1 / 2,
  [AXIA_GENESIS]: 3 / 4,
  default: 1 / 2
};
const TREASURY = {
  [KULUPU_GENESIS]: 1 / 2,
  [AXIALUNAR_GENESIS]: 3 / 5,
  [AXIA_GENESIS]: 3 / 5,
  default: 3 / 5
};
export function getFastTrackThreshold(api, isDefault) {
  return isDefault ? FAST_TRACK[api.genesisHash.toHex()] || FAST_TRACK.default : FAST_TRACK_NO_DELAY[api.genesisHash.toHex()] || FAST_TRACK_NO_DELAY.default;
}
export function getProposalThreshold(api) {
  return PROPOSE[api.genesisHash.toHex()] || PROPOSE.default;
}
export function getSlashProposalThreshold(api) {
  return SLASH[api.genesisHash.toHex()] || SLASH.default;
}
export function getTreasuryProposalThreshold(api) {
  return TREASURY[api.genesisHash.toHex()] || TREASURY.default;
}