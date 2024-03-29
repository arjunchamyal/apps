// Copyright 2017-2021 @axia-js/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0
import Component from '@axia-js/app-staking';
export default function create(t) {
  return {
    Component,
    display: {
      needsApi: [['tx.staking.bond']]
    },
    group: 'network',
    icon: 'certificate',
    name: 'staking',
    text: t('nav.staking', 'Staking', {
      ns: 'apps-routing'
    })
  };
}