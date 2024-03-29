// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useApi, useCall, useEventTrigger, useMapKeys } from '@axia-js/react-hooks';
const optChannels = {
  transform: ([[channelIds], channels]) => channelIds.map((id, index) => [id, channels[index]]).filter(([, opt]) => opt.isSome).map(([id, opt]) => [id, opt.unwrap()]).reduce((all, [id, channel]) => {
    var _all$dst, _id$receiver$toString, _all$src, _id$sender$toString;

    (_all$dst = all.dst)[_id$receiver$toString = id.receiver.toString()] || (_all$dst[_id$receiver$toString] = []);
    (_all$src = all.src)[_id$sender$toString = id.sender.toString()] || (_all$src[_id$sender$toString] = []);
    all.dst[id.receiver.toString()].push([id, channel]);
    all.src[id.sender.toString()].push([id, channel]);
    return all;
  }, {
    dst: {},
    src: {}
  }),
  withParamsTransform: true
};

function extractChannelIds(keys) {
  return keys.map(({
    args: [id]
  }) => id);
}

export default function useHrmp() {
  var _ref, _ref2, _ref3, _ref4;

  const {
    api
  } = useApi();
  const trigger = useEventTrigger([(_ref = api.events.parasHrmp || api.events.paraHrmp || api.events.hrmp) === null || _ref === void 0 ? void 0 : _ref.OpenChannelAccepted, (_ref2 = api.events.parasHrmp || api.events.paraHrmp || api.events.hrmp) === null || _ref2 === void 0 ? void 0 : _ref2.ChannelClosed]);
  const channelIds = useMapKeys((_ref3 = api.query.parasHrmp || api.query.paraHrmp || api.query.hrmp) === null || _ref3 === void 0 ? void 0 : _ref3.hrmpChannels, {
    at: trigger.blockHash,
    transform: extractChannelIds
  });
  return useCall(channelIds && ((_ref4 = api.query.parasHrmp || api.query.paraHrmp || api.query.hrmp) === null || _ref4 === void 0 ? void 0 : _ref4.hrmpChannels.multi), [channelIds], optChannels);
}