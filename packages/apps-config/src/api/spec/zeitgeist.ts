// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { OverrideBundleDefinition } from '@axia-js/types/types';

import * as typeDefs from '@zeitgeistpm/type-defs';

import { typesFromDefs } from '../util';

const bundle = {
  alias: {
    tokens: {
      AccountData: 'TokensAccountData'
    }
  },
  types: [{
    minmax: [0, undefined],
    types: {
      ...typesFromDefs(typeDefs),
      TokensAccountData: {
        free: 'Balance',
        frozen: 'Balance',
        reserved: 'Balance'
      }
    }
  }]
};

export default bundle as never as OverrideBundleDefinition;
