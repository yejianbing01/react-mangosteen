import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/v1/me',
    method: 'get',
    timeout: 100,
    response: (): Resource<User> => {
      return {
        resource: {
          id: 1,
          email: 'xxx@xxx.com',
          updated_at: '2021-08-01T00:00:00.000Z',
          created_at: '2021-08-01T00:00:00.000Z',
        }
      }
    },
  },
  {
    url: '/api/v1/items',
    method: 'get',
    response: (): Resources<Item> => {
      return {
        resources: [{
          id: 1,
          user_id: 1,
          amount: 1000,
          tag_ids: [1, 2],
          happen_at: '2021-08-01T00:00:00.000Z',
          created_at: '2021-08-01T00:00:00.000Z',
          updated_at: '2021-08-01T00:00:00.000Z',
          kind: 'expenses',
        }],
        pager: {
          page: 1,
          per_page: 25,
          count: 100
        }
      }
    },
  },
  {
    url: '/api/text',
    method: 'post',
    rawResponse: async (req, res) => {
      let reqbody = ''
      await new Promise((resolve) => {
        req.on('data', (chunk) => {
          reqbody += chunk
        })
        req.on('end', () => resolve(undefined))
      })
      res.setHeader('Content-Type', 'text/plain')
      res.statusCode = 200
      res.end(`hello, ${reqbody}`)
    },
  },
] as MockMethod[]
