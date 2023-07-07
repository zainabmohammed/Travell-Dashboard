import { create } from "zustand";

export const useAppStore = create((set) => ({
  screen: 'Bookings',
  isLogin: false,
  setIsLogin: (isLogin) => set({ isLogin }),
  setScreen: (screen) => set({ screen }),
}));



