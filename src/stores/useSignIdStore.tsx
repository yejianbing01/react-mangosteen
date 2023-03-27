import { create } from 'zustand'

type Data = {
  email: string
  code: string
}
interface SignInData {
  data: Data
  setData: (data: Partial<Data>) => void
}

export const useSignInStore = create<SignInData>(set => ({
  data: {
    email: '',
    code: ''
  },
  setData: data => set(state => ({
    data: {
      ...state.data,
      ...data
    }
  })),
}))
