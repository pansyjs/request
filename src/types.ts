import type { AxiosResponse, AxiosRequestConfig, AxiosError, InternalAxiosRequestConfig } from 'axios';
import type { ErrorShowType } from './config';

/** 接口返回数据格式 */
export interface IResponseData<D = any> {
  /** 标记请求是否成功 */
  success: boolean;
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

type RequestInterceptor = (config: IRequestOptions) => IRequestOptions;
type ResponseInterceptor = <T = any>(response : AxiosResponse<T>) => AxiosResponse<T> ;
type ErrorInterceptor = (error: Error) => Promise<Error>;
type RequestInterceptorTuple = [RequestInterceptor, ErrorInterceptor] | [ RequestInterceptor ] | RequestInterceptor;
type ResponseInterceptorTuple = [ResponseInterceptor, ErrorInterceptor] | [ResponseInterceptor] | ResponseInterceptor;

export interface RequestError<D> extends Omit<AxiosError<D>, 'message'> {
  message: {
    code?: string;
    config?: IRequestOptions<D> & InternalAxiosRequestConfig<D>;
    message: string;
    request: any;
    response: AxiosResponse<D>;
  };
}

export type ErrorHandler<D> = (
  error: RequestError<D>,
  config: IRequestOptions<D> & InternalAxiosRequestConfig<D>,
) => void;

export interface IRequestConfig<D = any> extends Partial<AxiosRequestConfig<D>> {
  /** 检查鉴权信息是否存在 */
  checkAuth?: () => boolean;
  formatData?: (data: any) => IResponseData<D>;
  /** 异常处理相关配置 */
  errorConfig?: {
    errorThrower?:(data: AxiosResponse<IResponseData<D>>) => void;
    /**
     * 错误接收及处理
     */
    errorHandler?: ErrorHandler<D>;
  };
  /** 请求拦截器 */
  requestInterceptors?: RequestInterceptorTuple[];
  /** 响应拦截器 */
  responseInterceptors?: ResponseInterceptorTuple[];
}

/** 请求配置参数 */
export interface IRequestOptions<D = any> extends Omit<IRequestConfig<D>, 'errorConfig'> {
  /**
   * 异常提示类型
   */
  errorShowType?: ErrorShowType;
  /**
   * 是否跳过异常处理
   * @default false
   */
  skipErrorHandler?: boolean;
  [key: string]: any;
}

export type GetResponse = boolean | 'data';


/** 获取 response */
export interface RequestOptionsWithResponse<D = any> extends IRequestOptions<D> {
  getResponse: true;
}

/** 获取 response.data */
export interface RequestOptionsWithoutResponse<D = any> extends IRequestOptions<D> {
  getResponse: false;
}

/** 获取 response.data.data */
export interface RequestOptionsWithoutDataResponse<D = any> extends IRequestOptions<D> {
  getResponse: 'data';
}

export interface IRequest {
  <T = any>(url: string, opts: RequestOptionsWithResponse): Promise<AxiosResponse<IResponseData<T>>>;
  <T = any>(url: string, opts: RequestOptionsWithoutResponse): Promise<IResponseData<T>>;
  <T = any>(url: string, opts: RequestOptionsWithoutDataResponse): Promise<T>;
  // getResponse 默认是 'data'， 因此不提供该参数时，只返回 response.data.data
  <T = any>(url: string, opts: IRequestOptions): Promise<T>;
  // 不提供 opts 时，默认使用 'GET' method，并且默认返回 data
  <T = any>(url: string): Promise<T>;
}

export { ResponseInterceptor }
