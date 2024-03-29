// Copyright 2017-2021 @axia-js/app-council authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useMemo } from 'react';
import { useApi } from '@axia-js/react-hooks';
export function useModuleElections() {
  const {
    api
  } = useApi();
  return useMemo(() => api.tx.phragmenElection ? 'phragmenElection' : api.tx.electionsPhragmen ? 'electionsPhragmen' : api.tx.elections ? 'elections' : null, [api]);
}