// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Route } from './types';

import Component from '@axia-js/app-extrinsics';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsAccounts: true,
      needsApi: []
    },
    group: 'developer',
    icon: 'envelope-open-text',
    name: 'extrinsics',
    text: t('nav.extrinsics', 'Extrinsics', { ns: 'apps-routing' })
  };
}
