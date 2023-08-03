import axios from '@pansy/axios';
export { request, setConfig, updateConfig, } from './request';

export { axios };
export { ErrorShowType } from './config';

export type {
  ResponseData,
  RequestConfig,
  RequestOptions,
  RequestError,
  ErrorHandler,
  ResponseInterceptor,
} from './types';
export type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
} from '@pansy/axios';
