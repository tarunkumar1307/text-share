import { create } from "zustand";

export const useStore = create((set) => ({
  shareID: null,
  updateShareID: (newShareID) => set({ shareID: newShareID }),
}));
