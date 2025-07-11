'use client';

import { create } from 'zustand';
import { ReactNode } from 'react';

type DialogContent = {
  title?: string;
  description?: string;
  children?: ReactNode;
};

type GlobalDialogStore = {
  isOpen: boolean;
  content: DialogContent | null;
  open: (content: DialogContent) => void;
  close: () => void;
};

export const useGlobalDialog = create<GlobalDialogStore>((set) => ({
  isOpen: false,
  content: null,
  open: (content) => set({ isOpen: true, content }),
  close: () => set({ isOpen: false }),
}));

export function useGlobalDialogControls() {
  return useGlobalDialog((state) => ({
    open: state.open,
    close: state.close,
  }));
}
