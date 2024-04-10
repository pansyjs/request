import mockAxios from 'vitest-mock-axios'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { initializeInstance, request } from './request'

afterEach(() => {
  mockAxios.reset()
})

vi.mock('axios')

describe('request', () => {
  it('initialize instance', () => {
    initializeInstance({
      baseURL: 'api',
    })

    expect(mockAxios.create).toHaveBeenCalledWith({
      baseURL: 'api',
    })
  })

  it('basic request', async () => {
    const users = [
      { name: 'kang' },
    ]

    const fetchUsers = request({
      method: 'get',
      url: '/users',
    })

    const promise = fetchUsers()

    const responseObj = {
      data: {
        code: 0,
        data: users,
        message: 'success',
      },
    }
    mockAxios.mockResponse(responseObj)

    const result = await promise

    expect(result.data).toEqual(users)
  })
})
