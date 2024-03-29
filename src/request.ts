import axios from 'axios';
import { defaultConfig } from './config';

import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import type { IRequest, IRequestConfig, } from './types';

export class Request {
  config: IRequestConfig;
  instance: AxiosInstance;
  abortMap: Map<string, AbortController>;

  constructor(config: IRequestConfig) {
    this.config = this.mergeConfig(defaultConfig, config)
    this.instance = this.getInstance(this.config);
    this.abortMap = new Map();
  }

  /**
   * 获取请求实例
   * @param config
   * @returns
   */
  getInstance = (config: IRequestConfig = {}): AxiosInstance => {
    const instance = axios.create(config);

    // 请求拦截器
    instance.interceptors.request.use(
      (res) => {
        const controller = new AbortController();
        res.signal = controller.signal;

        const { checkAuth } = res as IRequestConfig;
        const { __skipCheckAuth } = res.params || {};
        if (checkAuth && __skipCheckAuth !== true && checkAuth() === false) {
          console.error('Authentication information check failed')
          controller.abort();
        } else {
          const resId = this.getRequestId(res);
          this.abortMap.set(resId, controller);
        }

        return res;
      },
    );

    // 当响应的数据 success 是 false 的时候，抛出 error 以供 errorHandler 处理。
    instance.interceptors.response.use(
      (response) => {
        const resId = this.getRequestId(response.config);
        this.abortMap.delete(resId);

        const { responseType = 'json' } = response.config;

        try {
          const { config } = response;

          const formatData = (config as IRequestConfig)['formatData'];

          if (formatData && responseType === 'json') {
            response.data = formatData(response.data);
          }

        } catch (error) {}

        const { data } = response;

        if(data?.success === false && config?.errorConfig?.errorThrower){
          config.errorConfig.errorThrower(response);
        }

        return response;
      },
      (error) => {
        const config = error.config || {};
        if (config.skipErrorHandler === true) {
          throw error;
        } else {
          config.errorConfig?.errorHandler?.(error, error.response?.data || {});
          throw error
        };
      }
    );

    config.requestInterceptors?.forEach((interceptor) => {
      return interceptor instanceof Array ?
        instance.interceptors.request.use(interceptor[0] as any, interceptor[1]):
        instance.interceptors.request.use(interceptor as any);
    });

    config.responseInterceptors?.forEach((interceptor) => {
      return interceptor instanceof Array ?
        instance.interceptors.response.use(interceptor[0], interceptor[1]):
        instance.interceptors.response.use(interceptor);
    });

    return instance;
  }

  /** 更新配置 */
  updateConfig = (config: IRequestConfig) => {
    this.config = this.mergeConfig(this.config, config);

    this.instance = this.getInstance(config);
  }

  request: IRequest = (
    url: string,
    opts: any = { method: 'GET' },
  ) => {
    const {
      getResponse = 'data',
      requestInterceptors,
      responseInterceptors,
      ...rest
    } = opts;

    const requestInterceptorsToEject = requestInterceptors?.forEach((interceptor: any) => {
      return interceptor instanceof Array ?
        this.instance.interceptors.request.use(interceptor[0], interceptor[1]):
        this.instance.interceptors.request.use(interceptor);
    });

    const responseInterceptorsToEject = responseInterceptors?.forEach((interceptor: any) => {
      return interceptor instanceof Array ?
        this.instance.interceptors.response.use(interceptor[0], interceptor[1]):
        this.instance.interceptors.response.use(interceptor);
    });

    return new Promise<any>((resolve, reject) => {
      this.instance
        .request({ ...rest, url })
        .then((res) => {
          requestInterceptorsToEject?.forEach((interceptor: any) => {
            this.instance.interceptors.request.eject(interceptor);
          });
          responseInterceptorsToEject?.forEach((interceptor: any) => {
            this.instance.interceptors.response.eject(interceptor);
          });

          let data;

          switch (getResponse) {
            case true:
              data = res;
              break;
            case false:
              data = res.data;
              break;
            default:
              data = res?.data?.data;
              break;
          }

          resolve(data);
        })
        .catch((error) => {
          requestInterceptorsToEject?.forEach((interceptor: any) => {
            this.instance.interceptors.request.eject(interceptor);
          });
          responseInterceptorsToEject?.forEach((interceptor: any) => {
            this.instance.interceptors.response.eject(interceptor);
          });
          reject(error);
        });
    });
  }

  /**
   * 取消所有请求
   */
  cancelAll() {
    for (const [, controller] of this.abortMap) {
      controller.abort()
    }

    this.abortMap.clear()
  }

  getRequestId(res: InternalAxiosRequestConfig) {
    return JSON.stringify({
      url: res.url,
      method: res.method,
      params: res.params,
      data: res.data,
    });
  }

  mergeConfig(config: IRequestConfig, config1: IRequestConfig) {
    return (axios as any)['mergeConfig'](config, config1);
  }
}
