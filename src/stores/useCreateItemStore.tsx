import { create } from 'zustand'
import type { FormError } from '../lib/validate'
import { time } from '../lib/time'

type Data = Item

type CreateItemData = {
  data: Partial<Data>
  error: FormError<Data>
  setData: (data: Partial<Data>) => void
  setError: (error: Partial<FormError<Data>>) => void
}

export const useCreateItemStore = create<CreateItemData>(set => ({
  data: {
    kind: 'expenses',
    tag_ids: [],
    happen_at: time().format(),
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
