import { describe, expect, it } from 'vitest'
import type { AxiosRequestConfig } from '../types'
import urlArgs from './urlArgs'

describe('interceptor urlArgs', () => {
  it('should be defined', () => {
    expect(urlArgs).toBeDefined()
    expect(urlArgs.request.onFulfilled).toBeDefined()
  })

  it('可正常替换路径参数', () => {
    const { request } = urlArgs
    const { onFulfilled } = request

    const config = onFulfilled?.({
      url: '/api/user/{userId}',
      args: {
        userId: 1,
      },
    }) as AxiosRequestConfig

    expect(config.url).toBe('/api/user/1')
  })

  it('不设置 args 参数，则不替换路径参数', () => {
    const { request } = urlArgs
    const { onFulfilled } = request

    const config = onFulfilled?.({
      url: '/api/user/{userId}',
    }) as AxiosRequestConfig

    expect(config.url).toBe('/api/user/{userId}')
  })

  it('设置 args 参数，不提供对应的值，则抛出异常', async () => {
    const { request } = urlArgs
    const { onFulfilled } = request

    await expect(onFulfilled?.({
      url: '/api/user/{userId}',
      args: {
        id: 1,
      },
    }) as Promise<AxiosRequestConfig>).rejects.toThrow('Unable to find corresponding path parameter in args')

    await expect(onFulfilled?.({
      url: '/api/user/{userId}',
      args: {},
    }) as Promise<AxiosRequestConfig>).rejects.toThrow('Unable to find corresponding path parameter in args')
  })
})
