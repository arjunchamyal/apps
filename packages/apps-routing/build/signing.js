// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
import Component from '@axia-js/app-signing';
export default function create(t) {
  return {
    Component,
    display: {
      needsAccounts: true,
      needsApi: []
    },
    group: 'developer',
    icon: 'signature',
    name: 'signing',
    text: t('nav.signing', 'Sign and verify', {
      ns: 'apps-routing'
    })
  };
}