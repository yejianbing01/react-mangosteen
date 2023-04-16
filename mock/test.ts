import type { MockMethod } from 'vite-plugin-mock'
import { faker } from '@faker-js/faker'

function getItem(): Item {
  return {
    id: faker.datatype.uuid(),
    user_id: faker.datatype.uuid(),
    amount: faker.datatype.number({ min: 100, max: 10000 }),
    tag_ids: ['1', '2'],
    happen_at: faker.datatype.datetime().toISOString(),
    created_at: faker.datatype.datetime().toISOString(),
    updated_at: faker.datatype.datetime().toISOString(),
    kind: 'expenses' as const,
    note: faker.datatype.string(5)
  }
}

function getItems(num: number): Item[] {
  return Array.from({ length: num }).map(() => getItem())
}

function createResponse({ page = 1, limit = 10 }): Resources<Item> {
  const items = getItems(53)
  return {
    resources: items.slice((page - 1) * limit, limit * page),
    pager: {
      page,
      per_page: limit,
      count: 53
    }
  }
}

export default [
  {
    url: '/api/v1/me',
    method: 'get',
    timeout: 100,
    response: (): Resource<User> => {
      return {
        resource: {
          id: '1',
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
    response: ({ query }: ResponseParams): Resources<Item> => {
      const { page, limit } = query
      return createResponse({ page: Number(page), limit: Number(limit) })
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
