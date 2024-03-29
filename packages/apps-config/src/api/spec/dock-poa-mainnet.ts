// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { OverrideBundleDefinition } from '@axia-js/types/types';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
const types: any = require('@docknetwork/node-types');

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const definitions = types.spec['dock-main-runtime'] as OverrideBundleDefinition;

export default definitions;
