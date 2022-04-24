import { ErrorShowType } from './config';

import type { AxiosResponse, AxiosRequestConfig } from 'axios';

/** 后端返回数据格式 */
export interface ResponseData<D = any> {
  /** 接口状态码 */
  code: number;
  /** 接口返回数据 */
  data: D,
  /** 接口报错信息 */
  message: string;
  [key: string]: any;
}

type RequestInterceptor = (config : AxiosRequestConfig) => AxiosRequestConfig;
type ResponseInterceptor = <T = any>(response : AxiosResponse<T>) => AxiosResponse<T> ;

type ErrorInterceptor = (error: Error) => Promise<Error>;

type RequestInterceptorTuple = [RequestInterceptor, ErrorInterceptor] | [ RequestInterceptor ] | RequestInterceptor;
type ResponseInterceptorTuple = [ResponseInterceptor, ErrorInterceptor] | [ResponseInterceptor] | ResponseInterceptor;

export interface RequestError extends Error {
  data?: any;
  info?: ResponseData;
  request?: any;
  response?: any;
}

export interface ErrorHandler {
  (error: RequestError, opts: RequestOptions, config: RequestConfig): void;
}

export interface RequestConfig<D = any> extends AxiosRequestConfig<D> {
  /** 异常处理相关配置 */
  errorConfig?: {
    /**
     * 该方法接收两个参数，第一个参数是 catch 到的 error，第二个参数则是 request 的 opts。
     */
    errorHandler?: ErrorHandler;
    /**
     * 接收后端返回的数据并且抛出一个自己的 error，可以在这里根据后端的数据进行一定的处理。
     */
    errorThrower?: <T = any>(res: T) => void
  };
  /** 请求拦截器 */
  requestInterceptors?: RequestInterceptorTuple[];
  /** 响应拦截器 */
  responseInterceptors?: ResponseInterceptorTuple[];
}

export interface RequestOptions<D = any> extends AxiosRequestConfig<D> {
  /**
   * 是否跳过异常处理
   * @default false
   */
  skipErrorHandler?: boolean;
  /** 请求拦截器 */
  requestInterceptors?: RequestInterceptorTuple[];
  /** 响应拦截器 */
  responseInterceptors?: ResponseInterceptorTuple[];
}

export interface RequestOptionsWithResponse<D = any> extends RequestOptions<D> {
  getResponse: true;
}

export interface RequestOptionsWithoutResponse<D = any> extends RequestOptions<D> {
  getResponse: false;
}


export interface Request {
  <T = any>(url: string, opts: RequestOptionsWithResponse): Promise<AxiosResponse<T>>;
  <T = any>(url: string, opts: RequestOptionsWithoutResponse): Promise<T>;
  // getResponse 默认是 false， 因此不提供该参数时，只返回 data
  <T = any>(url: string, opts: RequestOptions): Promise<T>;
  // 不提供 opts 时，默认使用 'GET' method，并且默认返回 data
  <T = any>(url: string): Promise<T>;
}
