import { create } from 'zustand'

interface TopMenu {
  visible: boolean
  setVisible: (visible: boolean) => void
}

export const useTopMenuStore = create<TopMenu>(set => ({
  visible: false,
  setVisible: (visible: boolean) => set({ visible })
}))
