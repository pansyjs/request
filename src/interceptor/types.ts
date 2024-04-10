import type { AxiosResponse } from 'axios'
import type { AxiosRequestConfig } from '../types'

export interface Interceptor {
  request: {
    onFulfilled?: ((value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>) | null
    onRejected?: ((error: any) => any) | null
  }
  response: {
    onFulfilled?: ((response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>) | null
    onRejected?: ((error: any) => any) | null
  }
}
