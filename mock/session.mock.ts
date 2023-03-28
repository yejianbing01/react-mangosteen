import type { MockMethod } from 'vite-plugin-mock'

export const meMock: MockMethod = {
  url: 'api/vi/session',
  method: 'post',
  response: (): { jwt: string } => {
    return {
      jwt: 'jwt'
    }
  }
}
