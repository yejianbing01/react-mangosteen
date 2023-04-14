import { create } from 'zustand'
import type { FormError } from '../lib/validate'

type Data = {
  email: string
  code: string
}

interface SignInData {
  data: Data
  error: FormError<Data>
  setData: (data: Partial<Data>) => void
  setError: (error: Partial<FormError<Data>>) => void
}

export const useSignInStore = create<SignInData>(set => ({
  data: {
    email: 'yejb_01@163.com',
    code: '123456'
  },
  error: {
    email: [],
    code: []
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
