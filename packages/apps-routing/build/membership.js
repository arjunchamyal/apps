// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
import Component, { useCounter } from '@axia-js/app-membership';
export default function create(t) {
  return {
    Component,
    display: {
      needsAccounts: true,
      needsApi: ['query.membership.members']
    },
    group: 'governance',
    icon: 'people-carry',
    name: 'membership',
    text: t('nav.membership', 'Membership', {
      ns: 'apps-routing'
    }),
    useCounter
  };
}