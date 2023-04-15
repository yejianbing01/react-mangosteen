import { create } from 'zustand'
import type { FormError } from '../lib/validate'

type Data = Partial<Item>

interface CreateItemData {
  data: Data
  error: FormError<Data>
  setData: (data: Partial<Data>) => void
  setError: (error: Partial<FormError<Data>>) => void
}

export const useCreateItemStore = create<CreateItemData>(set => ({
  data: {
    kind: 'expenses',
    tag_ids: [],
    happen_at: '',
    amount: 0
  },
  error: {
    kind: [],
    tag_ids: [],
    happen_at: [],
    amount: []
  },
  setData: data => set(state => ({
    ...state,
    data: {
      ...state.data,
      ...data
    }
  })),
  setError: error => set(state => ({
    ...state,
    error: {
      ...error
    }
  }))
}))