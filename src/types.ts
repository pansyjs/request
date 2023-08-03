import type { AxiosResponse, AxiosRequestConfig, AxiosError } from '@pansy/axios';
import type { ErrorShowType } from './config';

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

type RequestInterceptor = (config: RequestOptions) => RequestOptions;
type ResponseInterceptor = <T = any>(response : AxiosResponse<T>) => AxiosResponse<T> ;
type ErrorInterceptor = (error: Error) => Promise<Error>;
type RequestInterceptorTuple = [RequestInterceptor, ErrorInterceptor] | [ RequestInterceptor ] | RequestInterceptor;
type ResponseInterceptorTuple = [ResponseInterceptor, ErrorInterceptor] | [ResponseInterceptor] | ResponseInterceptor;

export interface RequestError extends Omit<Error, 'message'> {
  message: AxiosError;
  name: 'AxiosError',
  [key: string]: any;
}

export type ErrorHandler = (error: RequestError) => void;

export interface RequestConfig<D = any> extends Partial<AxiosRequestConfig<D>> {
  /** 异常处理相关配置 */
  errorConfig?: {
    /**
     * 错误接收及处理
     */
    errorHandler?: ErrorHandler;
  };
  /** 请求拦截器 */
  requestInterceptors?: RequestInterceptorTuple[];
  /** 响应拦截器 */
  responseInterceptors?: ResponseInterceptorTuple[];
}

/** 请求配置参数 */
export interface RequestOptions<D = any> extends Omit<RequestConfig, 'errorConfig'> {
  /**
   * 是否跳过异常处理
   * @default false
   */
  skipErrorHandler?: boolean;
  [key: string]: any;
}

export type GetResponse = boolean | 'data';


/** 获取 response */
export interface RequestOptionsWithResponse<D = any> extends RequestOptions<D> {
  getResponse: true;
}

/** 获取 response.data */
export interface RequestOptionsWithoutResponse<D = any> extends RequestOptions<D> {
  getResponse: false;
}

/** 获取 response.data.data */
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
