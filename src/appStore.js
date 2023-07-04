import { create } from "zustand";

export const useAppStore = create((set) => ({
  screen: 'Bookings',
  setScreen: (screen) => set({ screen }),
}));



