// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Signer, SignerResult } from '@axia-js/api/types';
import type { Registry, SignerPayloadJSON } from '@axia-js/types/types';
import type { QrState } from '../types';

import { blake2AsU8a } from '@axia-js/util-crypto';

export default class QrSigner implements Signer {
  readonly #registry: Registry;
  readonly #setState: (state: QrState) => void;

  constructor (registry: Registry, setState: (state: QrState) => void) {
    this.#registry = registry;
    this.#setState = setState;
  }

  public async signPayload (payload: SignerPayloadJSON): Promise<SignerResult> {
    return new Promise((resolve, reject): void => {
      // limit size of the transaction
      const isQrHashed = (payload.method.length > 5000);
      const wrapper = this.#registry.createType('ExtrinsicPayload', payload, { version: payload.version });
      const qrPayload = isQrHashed
        ? blake2AsU8a(wrapper.toU8a(true))
        : wrapper.toU8a();

      this.#setState({
        isQrHashed,
        qrAddress: payload.address,
        qrPayload,
        qrReject: reject,
        qrResolve: resolve
      });
    });
  }
}