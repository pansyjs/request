import type { AxiosResponse } from '../types'
import type { Interceptor } from './types'

/**
 * 全局消息提示
 */
const errorMessageHandler: Interceptor = {
  request: {},
  response: {
    onFulfilled: (response: AxiosResponse) => {
      const { config, headers } = response

      if (headers['content-type'].includes('application/json')) {
        if (response.data?.success === false && config?.errorConfig?.errorHandler)
          config?.errorConfig?.errorHandler(response.data)
      }

      return response
    },
    onRejected: (error) => {
      const { config, response } = error

      config?.errorConfig?.errorHandler?.(response?.data, error)
      throw error
    },
  },
}

export default errorMessageHandler
