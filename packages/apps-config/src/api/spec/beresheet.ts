// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { OverrideBundleDefinition } from '@axia-js/types/types';

import { spec } from '@edgeware/node-types';

// There is no separate types bundle for testnet at this time
const beresheet = spec.typesBundle.spec?.edgeware as OverrideBundleDefinition;

export default beresheet;
