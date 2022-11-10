import axios from 'axios';

import type { AxiosInstance } from 'axios';
import type {
  Request,
  RequestConfig,
} from './types';

let requestInstance: AxiosInstance;
let config: RequestConfig = {};

/**
 * 设置配置数据
 * @param opts
 */
export const setConfig = (opts: RequestConfig = {}) => {
  config = opts;
}

export const updateConfig = (opts: RequestConfig = {}) => {
  config = {
    ...config,
    ...opts,
  };

  // @ts-ignore
  requestInstance = null;

  getRequestInstance();
}

/**
 * 获取请求实例
 * @returns
 */
const getRequestInstance = (): AxiosInstance => {
  if (requestInstance) return requestInstance;

  requestInstance = axios.create(config);

  config?.requestInterceptors?.forEach((interceptor) => {
    return interceptor instanceof Array ?
      requestInstance.interceptors.request.use(interceptor[0], interceptor[1]):
      requestInstance.interceptors.request.use(interceptor);
    });

  config?.responseInterceptors?.forEach((interceptor) => {
    return interceptor instanceof Array ?
      requestInstance.interceptors.response.use(interceptor[0], interceptor[1]):
      requestInstance.interceptors.response.use(interceptor);
    });

  // 当响应的数据 success 是 false 的时候，抛出 error 以供 errorHandler 处理。
  requestInstance.interceptors.response.use((response) => {
    try {
      if (
        config?.errorConfig?.errorThrower &&
        config.errorConfig.errorThrower(response)
      ) {
        return Promise.reject(response)
      }
    } catch (error) {
      return Promise.reject(error)
    }

    return response;
  });

  return requestInstance;
}

/**
 * 请求方法
 * @param url 接口地址
 * @param opts axios 的配置对象
 * @returns
 */
export const request: Request = (
  url: string,
  opts: any = { method: 'GET' },
) => {
  const requestInstance = getRequestInstance();

  const { getResponse = 'data', ...rest } = opts;

  return new Promise<any>((resolve, reject) => {
    requestInstance
      .request({ ...rest, url })
      .then((res) => {
        let data;

        switch (getResponse) {
          case 'data':
            data = res.data?.data;
            break;
          case false:
            data = res.data;
            break;
          default:
            data = res;
            break;
        }
        resolve(data);
      })
      .catch((error) => {
        try {
          const handler = config.errorConfig?.errorHandler;

          if (handler) {
            handler(error, rest, config);
          }
        } catch (e) {
          reject(e);
        }

        reject(error);
      });
  });
}
