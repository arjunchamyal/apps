import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
function sortLinks(a, b) {
  return a.isUnreachable !== b.isUnreachable ? a.isUnreachable ? 1 : -1 : 0;
}

function expandLinked(input) {
  return input.reduce((result, entry) => {
    result.push(entry);
    return entry.linked ? result.concat(expandLinked(entry.linked).map(child => {
      child.genesisHashRelay = entry.genesisHash;
      child.isChild = true;
      return child;
    })) : result;
  }, []);
}

function expandEndpoint(t, {
  dnslink,
  genesisHash,
  homepage,
  info,
  isChild,
  isDisabled,
  isUnreachable,
  linked,
  paraId,
  providers,
  teleport,
  text
}, firstOnly, withSort) {
  const base = {
    genesisHash,
    homepage,
    info,
    isChild,
    isDisabled,
    isUnreachable,
    paraId,
    teleport,
    text
  };
  const result = Object.entries(providers).filter((_, index) => !firstOnly || index === 0).map(([host, value], index) => _objectSpread(_objectSpread({}, base), {}, {
    dnslink: index === 0 ? dnslink : undefined,
    isLightClient: value.startsWith('light://'),
    isRelay: false,
    textBy: value.startsWith('light://') ? t('lightclient.experimental', 'light client (experimental)', {
      ns: 'apps-config'
    }) : t('rpc.hosted.via', 'via {{host}}', {
      ns: 'apps-config',
      replace: {
        host
      }
    }),
    value
  }));

  if (linked) {
    const last = result[result.length - 1];
    const options = [];
    (withSort ? linked.sort(sortLinks) : linked).filter(({
      paraId
    }) => paraId).forEach(o => options.push(...expandEndpoint(t, o, firstOnly, withSort)));
    last.isRelay = true;
    last.linked = options;
  }

  return expandLinked(result);
}

export function expandEndpoints(t, input, firstOnly, withSort) {
  return (withSort ? input.sort(sortLinks) : input).reduce((result, input) => result.concat(expandEndpoint(t, input, firstOnly, withSort)), []);
}