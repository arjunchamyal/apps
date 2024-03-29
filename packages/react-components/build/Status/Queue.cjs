"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _jsonrpc = _interopRequireDefault(require("@axia-js/types/interfaces/jsonrpc"));

var _index = require("../util/index.cjs");

var _constants = require("./constants.cjs");

var _Context = require("./Context.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

let nextId = 0;
const EVENT_MESSAGE = 'extrinsic event';
const REMOVE_TIMEOUT = 7500;
const SUBMIT_RPC = _jsonrpc.default.author.submitAndWatchExtrinsic;

function mergeStatus(status) {
  let others = null;
  const initial = status.reduce((result, status) => {
    const prev = result.find(_ref => {
      let {
        status: prev
      } = _ref;
      return prev.action === status.action && prev.status === status.status;
    });

    if (prev) {
      prev.count++;
    } else {
      result.push({
        count: 1,
        status
      });
    }

    return result;
  }, []).map(_ref2 => {
    let {
      count,
      status
    } = _ref2;
    return count === 1 ? status : _objectSpread(_objectSpread({}, status), {}, {
      action: `${status.action} (x${count})`
    });
  }).filter(status => {
    if (status.message !== EVENT_MESSAGE) {
      return true;
    }

    if (others) {
      if (status.action.startsWith('system.ExtrinsicSuccess')) {
        others.action.unshift(status.action);
      } else {
        others.action.push(status.action);
      }
    } else {
      others = _objectSpread(_objectSpread({}, status), {}, {
        action: [status.action]
      });
    }

    return false;
  });
  return others ? initial.concat(others) : initial;
}

function extractEvents(result) {
  return mergeStatus((result && result.events || [] // filter events handled globally, or those we are not interested in, these are
  // handled by the global overview, so don't add them here
  ).filter(record => !!record.event && record.event.section !== 'democracy').map(_ref3 => {
    let {
      event: {
        data,
        method,
        section
      }
    } = _ref3;

    if (section === 'system' && method === 'ExtrinsicFailed') {
      const [dispatchError] = data;
      let message = dispatchError.type;

      if (dispatchError.isModule) {
        try {
          const mod = dispatchError.asModule;
          const error = dispatchError.registry.findMetaError(mod);
          message = `${error.section}.${error.name}`;
        } catch (error) {// swallow
        }
      } else if (dispatchError.isToken) {
        message = `${dispatchError.type}.${dispatchError.asToken.type}`;
      }

      return {
        action: `${section}.${method}`,
        message,
        status: 'error'
      };
    } else if (section === 'contracts') {
      if (method === 'ContractExecution' && data.length === 2) {
        // see if we have info for this contract
        const [accountId, encoded] = data;

        try {
          const abi = (0, _index.getContractAbi)(accountId.toString());

          if (abi) {
            const decoded = abi.decodeEvent(encoded);
            return {
              action: decoded.event.identifier,
              message: 'contract event',
              status: 'event'
            };
          }
        } catch (error) {
          // ABI mismatch?
          console.error(error);
        }
      } else if (method === 'Evicted') {
        return {
          action: `${section}.${method}`,
          message: 'contract evicted',
          status: 'error'
        };
      }
    }

    return {
      action: `${section}.${method}`,
      message: EVENT_MESSAGE,
      status: 'event'
    };
  }));
}

function Queue(_ref4) {
  let {
    children
  } = _ref4;
  const [stqueue, _setStQueue] = (0, _react.useState)([]);
  const [txqueue, _setTxQueue] = (0, _react.useState)([]);
  const stRef = (0, _react.useRef)(stqueue);
  const txRef = (0, _react.useRef)(txqueue);
  const setStQueue = (0, _react.useCallback)(st => {
    stRef.current = st;

    _setStQueue(st);
  }, []);
  const setTxQueue = (0, _react.useCallback)(tx => {
    txRef.current = tx;

    _setTxQueue(tx);
  }, []);
  const addToTxQueue = (0, _react.useCallback)(value => {
    const id = ++nextId;

    const removeItem = () => setTxQueue([...txRef.current.map(item => item.id === id ? _objectSpread(_objectSpread({}, item), {}, {
      status: 'completed'
    }) : item)]);

    setTxQueue([...txRef.current, _objectSpread(_objectSpread({}, value), {}, {
      id,
      removeItem,
      rpc: value.rpc || SUBMIT_RPC,
      status: 'queued'
    })]);
  }, [setTxQueue]);
  const queueAction = (0, _react.useCallback)(_status => {
    const status = Array.isArray(_status) ? _status : [_status];
    status.length && setStQueue([...stRef.current, ...status.map(item => {
      const id = ++nextId;

      const removeItem = () => setStQueue([...stRef.current.filter(item => item.id !== id)]);

      setTimeout(removeItem, REMOVE_TIMEOUT);
      return _objectSpread(_objectSpread({}, item), {}, {
        id,
        isCompleted: false,
        removeItem
      });
    })]);
  }, [setStQueue]);
  const queueExtrinsic = (0, _react.useCallback)(value => addToTxQueue(_objectSpread({}, value)), [addToTxQueue]);
  const queuePayload = (0, _react.useCallback)((registry, payload, signerCb) => {
    addToTxQueue({
      accountId: payload.address,
      // this is not great, but the Extrinsic doesn't need a submittable
      extrinsic: registry.createType('Extrinsic', {
        method: registry.createType('Call', payload.method)
      }, {
        version: payload.version
      }),
      payload,
      signerCb
    });
  }, [addToTxQueue]);
  const queueRpc = (0, _react.useCallback)(value => addToTxQueue(_objectSpread({}, value)), [addToTxQueue]);
  const queueSetTxStatus = (0, _react.useCallback)((id, status, result, error) => {
    setTxQueue([...txRef.current.map(item => item.id === id ? _objectSpread(_objectSpread({}, item), {}, {
      error: error === undefined ? item.error : error,
      result: result === undefined ? item.result : result,
      status: item.status === 'completed' ? item.status : status
    }) : item)]);
    queueAction(extractEvents(result));

    if (_constants.STATUS_COMPLETE.includes(status)) {
      setTimeout(() => {
        const item = txRef.current.find(item => item.id === id);
        item && item.removeItem();
      }, REMOVE_TIMEOUT);
    }
  }, [queueAction, setTxQueue]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Context.QueueProvider, {
    value: {
      queueAction,
      queueExtrinsic,
      queuePayload,
      queueRpc,
      queueSetTxStatus,
      stqueue,
      txqueue
    },
    children: children
  });
}

var _default = /*#__PURE__*/_react.default.memo(Queue);

exports.default = _default;