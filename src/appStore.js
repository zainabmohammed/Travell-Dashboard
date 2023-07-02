import { create } from "zustand";

export const useAppStore = create((set) => ({
  screen: 'Orders',
  setScreen: (screen) => set({ screen }),
}));



