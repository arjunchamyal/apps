// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useCallback } from 'react';
import { useToggle } from "./useToggle.js";
export function useModal(defaultIsOpen, onOpen, onClose) {
  const [isOpen,, setIsOpen] = useToggle(defaultIsOpen || false);

  const _onOpen = useCallback(() => {
    setIsOpen(true);
    onOpen && onOpen();
  }, [onOpen, setIsOpen]);

  const _onClose = useCallback(() => {
    setIsOpen(false);
    onClose && onClose();
  }, [onClose, setIsOpen]);

  return {
    isOpen,
    onClose: _onClose,
    onOpen: _onOpen
  };
}