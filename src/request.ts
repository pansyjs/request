import axios from 'axios';

import type { AxiosInstance } from 'axios';
import type {
  Request,
  RequestOptions,
  RequestConfig,
} from './types';

let requestInstance: AxiosInstance;
let config: RequestConfig = {};

/**
 * 设置配置数据
 * @param data
 */
export const setConfig = (data: RequestConfig = {}) => {
  config = data;
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
  requestInstance.interceptors.response.use((response)=>{
    const { data } = response;

    if (config?.errorConfig?.errorThrower) {
      config.errorConfig.errorThrower(data);
    }

    return response;
  });

  return requestInstance;
}

/**
 * 请求方法
 * @param url API地址
 * @param opts axios 的配置对象
 * @returns
 */
export const request: Request = (
  url: string,
  opts: RequestOptions = { method: 'GET' },
) => {
  const requestInstance = getRequestInstance();

  // @ts-ignore
  const { getResponse = false, requestInterceptors, responseInterceptors } = opts;

  const requestInterceptorsToEject = requestInterceptors?.map((interceptor) => {
    return interceptor instanceof Array ?
      requestInstance.interceptors.request.use(interceptor[0], interceptor[1]):
      requestInstance.interceptors.request.use(interceptor);
    });

  const responseInterceptorsToEject = responseInterceptors?.map((interceptor) => {
    return interceptor instanceof Array ?
      requestInstance.interceptors.response.use(interceptor[0], interceptor[1]):
      requestInstance.interceptors.response.use(interceptor);
    });

  return new Promise<any>((resolve, reject) => {
    requestInstance
      .request({ ...opts, url })
      .then((res) => {
        requestInterceptorsToEject?.forEach((interceptor) => {
          requestInstance.interceptors.request.eject(interceptor);
        });
        responseInterceptorsToEject?.forEach((interceptor) => {
          requestInstance.interceptors.response.eject(interceptor);
        });
        resolve(getResponse ? res : res.data);
      })
      .catch((error) => {
        console.error(error);
        requestInterceptorsToEject?.forEach((interceptor) => {
          requestInstance.interceptors.request.eject(interceptor);
        });
        responseInterceptorsToEject?.forEach((interceptor) => {
          requestInstance.interceptors.response.eject(interceptor);
        });

        try {
          const handler = config.errorConfig?.errorHandler;

          if (handler) {
            handler(error, opts, config);
          }
        } catch (e) {
          reject(e);
        }

        reject(error);
      });
  });
}
