import { create } from 'zustand'

interface Local {
  hasReadWelcomes: boolean
  setHasReadWelcomes: (read: boolean) => void
}

const initHasReadWelcomes = localStorage.getItem('hasReadWelcomes') === 'yes'

export const useLocalStore = create<Local>(set => ({
  hasReadWelcomes: initHasReadWelcomes,
  setHasReadWelcomes: (read) => {
    localStorage.setItem('hasReadWelcomes', read ? 'yes' : 'no')
    set({ hasReadWelcomes: read })
  },
}))
