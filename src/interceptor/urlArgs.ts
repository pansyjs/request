import type { AxiosRequestConfig } from '../types'
import type { Interceptor } from './types'

/**
 * 替换路径参数
 */
const urlArgsHandler: Interceptor = {
  request: {
    onFulfilled: (config: AxiosRequestConfig) => {
      const { url, args } = config

      if (args) {
        const lostParams: string[] = []

        const replacedUrl = url!.replace(/\{([^}]+)\}/g, (res, arg: string) => {
          if (!args[arg])
            lostParams.push(arg)

          return args[arg] as string
        })

        if (lostParams.length)
          return Promise.reject(new Error('Unable to find corresponding path parameter in args'))

        return { ...config, url: replacedUrl }
      }
      return config
    },
  },
  response: {},
}

export default urlArgsHandler
