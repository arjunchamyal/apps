// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
import Component from '@axia-js/app-sudo';
export default function create(t) {
  return {
    Component,
    display: {
      needsAccounts: true,
      needsApi: ['tx.sudo.setKey'],
      needsSudo: true
    },
    group: 'developer',
    icon: 'unlock',
    name: 'sudo',
    text: t('nav.sudo', 'Sudo', {
      ns: 'apps-routing'
    })
  };
}