import axios from 'axios';

import type { AxiosInstance, } from 'axios';
import type {
  Request,
  RequestError,
  RequestConfig,
} from './types';

let requestInstance: AxiosInstance;
let config: RequestConfig = {};

const getRequestInstance = (): AxiosInstance => {
  if (requestInstance) return requestInstance;

  requestInstance = axios.create(config);

  requestInstance.interceptors.response.use((response)=>{
    const {data} = response;
    const adaptor = config?.errorConfig?.adaptor || ((resData) => resData);
    const errorInfo = adaptor(data,response);
    if(errorInfo.success === false){
      const error: RequestError = new Error(errorInfo.errorMessage);
      error.name = 'BizError';
      error.data = data;
      error.info = errorInfo;
      throw error;
    }
    return response;
  });

  return requestInstance;
}

export const setConfig = (data: RequestConfig = {}) => {
  config = data;
}

export const request: Request = (url, opts) => {
  const requestInstance = getRequestInstance();

  return new Promise((resolve, reject) => {
    requestInstance
      .request({ ...opts, url })
      .then((res) => {
        const formatResultAdaptor =
          config?.formatResultAdaptor || ((res) => res.data);
        resolve(formatResultAdaptor(res));
      })
      .catch((error) => {
        try {
          const handler = config.errorConfig?.errorHandler;

          handler?.(error, opts, config);
        } catch (e) {
          reject(e);
        }
      });
  });
}
