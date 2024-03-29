// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { CardSummary, SummaryBox } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { BestFinalized, BestNumber, BlockToTime, TimeNow, TotalIssuance } from '@axia-js/react-query';
import { BN_ONE, formatNumber } from '@axia-js/util';

import SummarySession from './SummarySession';
import { useTranslation } from './translate';

interface Props {
  eventCount: number;
}

function Summary ({ eventCount }: Props): React.ReactElement {
  const { t } = useTranslation();
  const { api } = useApi();

  return (
    <SummaryBox>
      <section>
        {api.query.timestamp && (
          <>
            <CardSummary label={t<string>('last block')}>
              <TimeNow />
            </CardSummary>
            <CardSummary
              className='media--800'
              label={t<string>('target')}
            >
              <BlockToTime value={BN_ONE} />
            </CardSummary>
          </>
        )}
        {api.query.balances && (
          <CardSummary
            className='media--800'
            label={t<string>('total issuance')}
          >
            <TotalIssuance />
          </CardSummary>
        )}
      </section>
      <section className='media--1200'>
        <SummarySession withEra={false} />
      </section>
      <section>
        <CardSummary
          className='media--1000'
          label={t<string>('last events')}
        >
          {formatNumber(eventCount)}
        </CardSummary>
        {api.query.grandpa && (
          <CardSummary label={t<string>('finalized')}>
            <BestFinalized />
          </CardSummary>
        )}
        <CardSummary label={t<string>('best')}>
          <BestNumber />
        </CardSummary>
      </section>
    </SummaryBox>
  );
}

export default React.memo(Summary);
