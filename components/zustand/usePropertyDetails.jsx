import { create } from 'zustand'
import { persist, createJSONStorage } from "zustand/middleware"

let store = (set, get) => ({
    propertydetails: {},
    updatePropertyDetails: (data) => set({ propertydetails: data }),
})

store = persist(store, {
    name: "propertydetails",
    storage: createJSONStorage(() => localStorage)
})

export const usePropertyDetails = create(store)