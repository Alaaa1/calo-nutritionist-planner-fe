import { create } from "zustand";
import { IMealStore } from "../interfaces";

const useMealStore = create<IMealStore>((set) => ({
  addOpen: false,
  setAddOpen: (isOpen) => set({ addOpen: isOpen }),
  selectedMeal: null,
  setSelectedMeal: (meal) => set({ selectedMeal: meal }),
}));

export default useMealStore;