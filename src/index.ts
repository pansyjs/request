import axios from 'axios';
export { Request } from './request';

export { axios };
export { ErrorShowType } from './config';

export type {
  IRequest,
  IResponseData,
  IRequestConfig,
  IRequestOptions,
  RequestError,
  ErrorHandler,
  ResponseInterceptor,
} from './types';
export type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
} from 'axios';
