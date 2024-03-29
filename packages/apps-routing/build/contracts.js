// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
import Component from '@axia-js/app-contracts';
export default function create(t) {
  return {
    Component,
    display: {
      needsAccounts: true,
      needsApi: ['tx.contracts.instantiateWithCode']
    },
    group: 'developer',
    icon: 'compress',
    name: 'contracts',
    text: t('nav.contracts', 'Contracts', {
      ns: 'apps-routing'
    })
  };
}