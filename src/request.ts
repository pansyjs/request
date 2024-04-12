import axios from 'axios'
import { assign } from 'radash'
import type { AxiosInstance } from 'axios'
import urlArgsInterceptor from './interceptor/urlArgs'
import errorMessageInterceptor from './interceptor/error'

import type { Request, RequestConfig } from './types'
import type { Interceptor } from './interceptor/types'

let initializeConfig: RequestConfig = {}
const defaultInterceptors = [
  urlArgsInterceptor,
  errorMessageInterceptor,
]

interface CreateAxiosOptions {
  /** 是否使用默认拦截器 */
  enableDefaultInterceptors?: boolean
  /** 扩展拦截器 */
  interceptors?: Interceptor[]
}

/**
 * 创建 axios 实例
 * @param config
 */
export function createAxios(config: RequestConfig, opts: CreateAxiosOptions = {}) {
  const { interceptors = [], enableDefaultInterceptors = true } = opts
  const instance = axios.create(config)

  const latestInterceptors = enableDefaultInterceptors
    ? [...defaultInterceptors, ...interceptors]
    : interceptors

  latestInterceptors.forEach((handler) => {
    const { request, response } = handler
    if (request.onFulfilled || request.onRejected) {
      instance.interceptors.request.use(
        request.onFulfilled as any,
        request.onRejected,
      )
    }
    if (response.onFulfilled || response.onRejected)
      instance.interceptors.response.use(response.onFulfilled, response.onRejected)
  })

  return instance
}

let instance = createAxios(initializeConfig)

/**
 * 初始化 axios 实例
 * @param config
 */
export function initializeInstance(config: RequestConfig, options: CreateAxiosOptions = {}): AxiosInstance {
  initializeConfig = config
  instance = createAxios(config, options)

  return instance
}

export function createInstance(config: RequestConfig, options: CreateAxiosOptions = {}): AxiosInstance {
  return createAxios(config, options)
}

export const request: Request = (config: RequestConfig) => {
  return async (requestConfig?: Partial<RequestConfig>) => {
    const mergedConfig: RequestConfig = assign(config, requestConfig || {})

    try {
      const response = await instance.request(mergedConfig)
      const { data } = response
      return { data: data.data, response, error: null }
    }
    catch (error: any) {
      return { error, data: null, response: null }
    }
  }
}
