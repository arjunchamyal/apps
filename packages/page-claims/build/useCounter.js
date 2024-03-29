// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
import useAXIAPreclaims from "./useAXIAPreclaims.js";
export default function useCounter() {
  const needAttest = useAXIAPreclaims();
  return needAttest.length;
}