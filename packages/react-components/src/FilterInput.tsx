// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';

import { Input } from '@axia-js/react-components/index';

interface Props {
  className?: string;
  filterOn: string;
  label: string;
  setFilter: (filter: string) => void;
}

function Filter ({ className = '', filterOn, label, setFilter }: Props) {
  return (
    <div className={className}>
      <Input
        autoFocus
        isFull
        label={label}
        onChange={setFilter}
        value={filterOn}
      />
    </div>
  );
}

export default React.memo(styled(Filter)`
  width: 29.5rem;

  :not(:only-child) {
    margin-left: 1.5rem;
  }

  .ui--Input {
    margin: 0;
    height: 3.893rem;
  }
`);
