// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
import Component, { useCounter } from '@axia-js/app-tech-comm';
export default function create(t) {
  return {
    Component,
    display: {
      needsAccounts: true,
      needsApi: ['query.technicalCommittee.members'],
      needsApiInstances: true
    },
    group: 'governance',
    icon: 'microchip',
    name: 'techcomm',
    text: t('nav.tech-comm', 'Tech. comm.', {
      ns: 'apps-routing'
    }),
    useCounter
  };
}