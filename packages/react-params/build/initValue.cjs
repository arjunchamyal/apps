"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getInitValue;

var _types = require("@axia-js/types");

var _types2 = require("@axia-js/types/types");

var _util = require("@axia-js/util");

// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
const warnList = [];

function getInitValue(registry, def) {
  if (def.info === _types2.TypeDefInfo.Vec) {
    return [getInitValue(registry, def.sub)];
  } else if (def.info === _types2.TypeDefInfo.Tuple) {
    return Array.isArray(def.sub) ? def.sub.map(def => getInitValue(registry, def)) : [];
  } else if (def.info === _types2.TypeDefInfo.Struct) {
    return Array.isArray(def.sub) ? def.sub.reduce((result, def) => {
      result[def.name] = getInitValue(registry, def);
      return result;
    }, {}) : {};
  } else if (def.info === _types2.TypeDefInfo.Enum) {
    return Array.isArray(def.sub) ? {
      [def.sub[0].name]: getInitValue(registry, def.sub[0])
    } : {};
  }

  const type = [_types2.TypeDefInfo.Compact, _types2.TypeDefInfo.Option].includes(def.info) ? def.sub.type : def.type;

  switch (type) {
    case 'AccountIndex':
    case 'Balance':
    case 'BalanceOf':
    case 'BlockNumber':
    case 'Compact':
    case 'Gas':
    case 'Index':
    case 'Nonce':
    case 'ParaId':
    case 'PropIndex':
    case 'ProposalIndex':
    case 'ReferendumIndex':
    case 'i8':
    case 'i16':
    case 'i32':
    case 'i64':
    case 'i128':
    case 'u8':
    case 'u16':
    case 'u32':
    case 'u64':
    case 'u128':
    case 'VoteIndex':
      return _util.BN_ZERO;

    case 'bool':
      return false;

    case 'Bytes':
      return undefined;

    case 'String':
    case 'Text':
      return '';

    case 'Moment':
      return _util.BN_ZERO;

    case 'Vote':
      return -1;

    case 'VoteThreshold':
      return 0;

    case 'BlockHash':
    case 'CodeHash':
    case 'Hash':
    case 'H256':
      return registry.createType('H256');

    case 'H512':
      return registry.createType('H512');

    case 'H160':
      return registry.createType('H160');

    case 'Raw':
    case 'Keys':
      return '';

    case 'AccountId':
    case 'AccountIdOf':
    case 'Address':
    case 'Call':
    case 'CandidateReceipt':
    case 'Digest':
    case 'Header':
    case 'KeyValue':
    case 'LookupSource':
    case 'MisbehaviorReport':
    case 'Proposal':
    case 'Signature':
    case 'SessionKey':
    case 'StorageKey':
    case 'ValidatorId':
      return undefined;

    case 'Extrinsic':
      return registry.createType('Raw');

    case 'Null':
      return null;

    default:
      {
        let error = null;

        try {
          const instance = registry.createType(type);
          const raw = (0, _types.getTypeDef)(instance.toRawType());

          if ((0, _util.isBn)(instance)) {
            return _util.BN_ZERO;
          } else if ([_types2.TypeDefInfo.Struct].includes(raw.info)) {
            return undefined;
          } else if ([_types2.TypeDefInfo.Enum, _types2.TypeDefInfo.Tuple].includes(raw.info)) {
            return getInitValue(registry, raw);
          }
        } catch (e) {
          error = e.message;
        } // we only want to want once, not spam


        if (!warnList.includes(type)) {
          warnList.push(type);
          error && console.error(`params: initValue: ${error}`);
          console.info(`params: initValue: No default value for type ${type} from ${JSON.stringify(def)}, using defaults`);
        }

        return '0x';
      }
  }
}