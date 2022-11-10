import { ErrorShowType } from './config';

import type { AxiosResponse, AxiosRequestConfig } from 'axios';

/** 接口返回数据格式 */
export interface ResponseData<D = any> {
  /** 接口状态码 */
  code: number;
  /** 接口返回数据 */
  data: D,
  /** 接口报错信息 */
  message: string;
  /** 接口报错处理类型 */
  showType?: ErrorShowType;
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
     * 错误接收及处理
     */
    errorHandler?: ErrorHandler;
    /**
     * 接收后端返回的数据判断是否为异常请求
     */
    errorThrower?: (res: D) => boolean
  };
  /** 请求拦截器 */
  requestInterceptors?: RequestInterceptorTuple[];
  /** 响应拦截器 */
  responseInterceptors?: ResponseInterceptorTuple[];
}

/** 请求配置参数 */
export interface RequestOptions<D = any> extends AxiosRequestConfig<D> {
  /**
   * 是否跳过异常处理
   * @default false
   */
  skipErrorHandler?: boolean;
  [key: string]: any;
}

export type GetResponse = boolean | 'data';

export interface RequestOptionsWithResponse<D = any> extends RequestOptions<D> {
  getResponse: true;
}

export interface RequestOptionsWithoutResponse<D = any> extends RequestOptions<D> {
  getResponse: false;
}

export interface RequestOptionsWithoutDataResponse<D = any> extends RequestOptions<D> {
  getResponse: 'data';
}

export interface Request {
  <T = any>(url: string, opts: RequestOptionsWithResponse): Promise<AxiosResponse<ResponseData<T>>>;
  <T = any>(url: string, opts: RequestOptionsWithoutResponse): Promise<ResponseData<T>>;
  <T = any>(url: string, opts: RequestOptionsWithoutDataResponse): Promise<T>;
  // getResponse 默认是 'data'， 因此不提供该参数时，只返回 response.data.data
  <T = any>(url: string, opts: RequestOptions): Promise<T>;
  // 不提供 opts 时，默认使用 'GET' method，并且默认返回 data
  <T = any>(url: string): Promise<T>;
}

export { ResponseInterceptor }
