"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storageSystemEvents = exports.storageRetrieveInfoOnQueryKeys = exports.storageListenToMultipleBalancesChange = exports.storageListenToBalanceChange = exports.storageKeys = exports.storageGetInfo = void 0;
// Copyright 2017-2021 @axia-js/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0
const label = {
  children: 'Storage',
  color: 'blue',
  size: 'tiny'
};
const storageGetInfo = {
  code: `// Get chain state information
// Make our basic chain state / storage queries, all in one go

const [now, minimumValidatorCount, validators] = await Promise.all([
  api.query.timestamp.now(),
  api.query.staking.minimumValidatorCount(),
  api.query.session.validators()
]);

console.log('The current date is: ' + now);
console.log('The minimum validator count: ' + minimumValidatorCount);

if (validators && validators.length > 0) {
  // Retrieve the balances for all validators
  console.log('Validators');

  const validatorBalances = await Promise.all(
    validators.map((authorityId) => api.query.system.account(authorityId))
  );

  validators.forEach((authorityId, index) => {
    console.log('Validator: ' + authorityId.toString() )
    console.log('AccountData: ' + validatorBalances[index].toHuman() );
  });
}
`,
  label,
  text: 'Get chain state information',
  value: 'storageGetInfo'
};
exports.storageGetInfo = storageGetInfo;
const storageSystemEvents = {
  code: `// Subscribe to system events via storage
api.query.system.events((events) => {
  console.log('----- Received ' + events.length + ' event(s): -----');
  // loop through the Vec<EventRecord>
  events.forEach((record) => {
  // extract the phase, event and the event types
    const { event, phase } = record;
    const types = event.typeDef;
    // show what we are busy with
    console.log(event.section + ':' + event.method + '::' + 'phase=' + phase.toString());
    console.log(event.meta.docs.toString());
    // loop through each of the parameters, displaying the type and data
    event.data.forEach((data, index) => {
      console.log(types[index].type + ';' + data.toString());
    });
  });
});`,
  label,
  text: 'Listen to system events',
  value: 'storageSystemEvents'
};
exports.storageSystemEvents = storageSystemEvents;
const storageListenToBalanceChange = {
  code: `// You may leave this example running and make a transfer
// of any value from or to Alice address in the 'Transfer' App
const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

// Retrieve the initial data
let [, { free: previous }] = await api.query.system.account(ALICE);

console.log('ALICE has a balance of ' + previous);

// Subscribe and listen to balance changes
api.query.system.account(ALICE, ([, { free }]) => {
  // Calculate the delta
  const change = free.sub(previous);
  // Only display positive value changes (Since we are pulling 'previous' above already,
  // the initial balance change will also be zero)
  if (!change.isZero()) {
    previous = free;
    console.log('New transaction of: '+ change);
  }
});`,
  label,
  text: 'Listen to balance changes',
  value: 'storageListenToBalanceChange'
};
exports.storageListenToBalanceChange = storageListenToBalanceChange;
const storageListenToMultipleBalancesChange = {
  code: `// You may leave this example running and make a transfer
// of any value from or to Alice/Bob address in the 'Transfer' App
const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';

console.log('Tracking balances for:', [ALICE, BOB])

// Subscribe and listen to several balance changes
api.query.system.account.multi([ALICE, BOB], (info) => {
  console.log('Change detected, new balances: ', info)
});`,
  label,
  text: 'Listen to multiple balances changes',
  value: 'storageListenToMultipleBalancesChange'
};
exports.storageListenToMultipleBalancesChange = storageListenToMultipleBalancesChange;
const storageRetrieveInfoOnQueryKeys = {
  code: `// This example set shows how to make queries at a point
const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

// retrieve the balance, once-off at the latest block
const { data: { free } } = await api.query.system.account(ALICE);

console.log('Alice has a current balance of', free.toHuman());

// retrieve balance updates with an optional value callback
const balanceUnsub = await api.query.system.account(ALICE, ({ data: { free } }) => {
  console.log('Alice has an updated balance of', free.toHuman());
});

// retrieve the balance at a block hash in the past
const header = await api.rpc.chain.getHeader();
const prevHash = await api.rpc.chain.getBlockHash(header.number.unwrap().subn(42));
const { data: { free: prev } } = await api.query.system.account.at(prevHash, ALICE);

console.log('Alice had a balance of', prev.toHuman(), '(42 blocks ago)');

// useful in some situations - the value hash and storage entry size
const currHash = await api.query.system.account.hash(ALICE);
const currSize = await api.query.system.account.size(ALICE);

console.log('Alice account entry has a value hash of', currHash, 'with a size of', currSize);`,
  label,
  text: 'Retrieve historic query data',
  value: 'storageRetrieveInfoOnQueryKeys'
};
exports.storageRetrieveInfoOnQueryKeys = storageRetrieveInfoOnQueryKeys;
const storageKeys = {
  code: `// this example shows how to retrieve the hex representation of a storage key

const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

// show the key for an entry without arguments
console.log(api.query.timestamp.now.key());

// show the key for a map entry (single argument)
console.log(api.query.system.account.key(ALICE));

// show the key prefix for a map
console.log(api.query.system.account.keyPrefix());

// show the key for a double map
console.log(api.query.staking.erasStakers.key(0, ALICE));

// show the key prefix for a doublemap
console.log(api.query.staking.erasStakers.keyPrefix());
`,
  label,
  text: 'Get underlying storage key hex values',
  value: 'storageKeys'
};
exports.storageKeys = storageKeys;