import axios from '@pansy/axios';
import { defaultConfig } from './config';

import type { AxiosInstance } from '@pansy/axios';
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
  config = {
    ...defaultConfig,
    ...opts,
  };
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
      requestInstance.interceptors.request.use(interceptor[0] as any, interceptor[1]):
      requestInstance.interceptors.request.use(interceptor as any);
  });

  config?.responseInterceptors?.forEach((interceptor) => {
    return interceptor instanceof Array ?
      requestInstance.interceptors.response.use(interceptor[0], interceptor[1]):
      requestInstance.interceptors.response.use(interceptor);
  });

  // 当响应的数据 success 是 false 的时候，抛出 error 以供 errorHandler 处理。
  requestInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      config.errorConfig?.errorHandler?.(error)
    }
  );

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

  const {
    getResponse = 'data',
    requestInterceptors,
    responseInterceptors,
    ...rest
  } = opts;

  const requestInterceptorsToEject = requestInterceptors?.forEach((interceptor: any) => {
    return interceptor instanceof Array ?
      requestInstance.interceptors.request.use(interceptor[0], interceptor[1]):
      requestInstance.interceptors.request.use(interceptor);
  });

  const responseInterceptorsToEject = responseInterceptors?.forEach((interceptor: any) => {
    return interceptor instanceof Array ?
      requestInstance.interceptors.response.use(interceptor[0], interceptor[1]):
      requestInstance.interceptors.response.use(interceptor);
  });

  return new Promise<any>((resolve, reject) => {
    requestInstance
      .request({ ...rest, url })
      .then((res) => {
        requestInterceptorsToEject?.forEach((interceptor: any) => {
          requestInstance.interceptors.request.eject(interceptor);
        });
        responseInterceptorsToEject?.forEach((interceptor: any) => {
          requestInstance.interceptors.response.eject(interceptor);
        });

        let data;

        switch (getResponse) {
          case 'data':
            data = res?.data?.data;
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
        requestInterceptorsToEject?.forEach((interceptor: any) => {
          requestInstance.interceptors.request.eject(interceptor);
        });
        responseInterceptorsToEject?.forEach((interceptor: any) => {
          requestInstance.interceptors.response.eject(interceptor);
        });
        reject(error);
      });
  });
}
