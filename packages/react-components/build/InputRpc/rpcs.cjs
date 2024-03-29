"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllRpc = getAllRpc;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _jsonrpc = _interopRequireDefault(require("@axia-js/types/interfaces/jsonrpc"));

var _typesKnown = require("@axia-js/types-known");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function toExt(section, input) {
  return Object.entries(input).reduce((output, _ref) => {
    let [method, def] = _ref;
    output[method] = _objectSpread({
      isSubscription: false,
      jsonrpc: `${method}_${section}`,
      method,
      section
    }, def);
    return output;
  }, {});
}

function getAllRpc(registry, chain, _ref2) {
  let {
    specName
  } = _ref2;
  return Object.entries((0, _typesKnown.getSpecRpc)(registry, chain, specName)).reduce((all, _ref3) => {
    var _all$section;

    let [section, contents] = _ref3;
    (_all$section = all[section]) !== null && _all$section !== void 0 ? _all$section : all[section] = toExt(section, contents);
    return all;
  }, _objectSpread({}, _jsonrpc.default));
}