import type {
  AxiosError,
  AxiosRequestConfig as AxiosRequestConfigType,
  AxiosRequestHeaders,
  AxiosResponse as AxiosResponseType,
} from 'axios'

export enum ErrorShowType {
  /** 不做处理 */
  SILENT = 0,
}

export interface AxiosResponse<Payload = any, D = any> extends Omit<AxiosResponseType<ResponseData<Payload>, D>, 'config'> {
  config: RequestConfig<Payload, D> & {
    headers: AxiosRequestHeaders
  }
}

/** 接口返回数据格式 */
export interface ResponseData<Payload = any> {
  /** 标记请求是否成功 */
  success: boolean
  /** 接口状态码 */
  code: number
  /** 接口返回数据 */
  data: Payload
  /** 接口报错信息 */
  message: string
  [key: string]: any
}

export interface ResponseResult<Payload = any> {
  data: Payload
  error: AxiosError | null
  response: AxiosResponse<ResponseData<Payload>> | null
}

export type ErrorHandler<D> = (error: AxiosError<D>, data: D) => void

/**
 * 扩展 AxiosRequestConfig 类型
 *  1. 可定义 params 类型
 *  2. 新增 args 类型，用于存放路径参数
 */
export interface AxiosRequestConfig<
  Data = any,
  Params = any,
  Args extends object = any,
> extends Omit<AxiosRequestConfigType<Data>, 'params'> {
  params?: Params
  args?: Args
}

/**
 * 请求配置，泛型参数说明：
 *   Payload: 用于定义响应结果的数据类型
 *   Data：用于定义 data 的数据类型
 *   Params：用于定义parmas的数据类型
 *   Args：用于定义存放路径参数的属性 args 的数据类型
 */
export interface RequestConfig<
  Payload = any,
  Data = any,
  Params = any,
  Args extends object = any,
> extends Partial<AxiosRequestConfig<Data, Params, Args>> {
  /** 异常处理相关配置 */
  errorConfig?: {
    /**
     * 错误接收及处理
     */
    errorHandler?: (data: ResponseData<Payload>, error?: AxiosError<ResponseData<Payload>>) => void
  }
}

export interface Request {
  <Payload = any>(config: RequestConfig<Payload>): (
    requestConfig?: Partial<RequestConfig<Payload>>,
  ) => Promise<ResponseResult<Payload>>

  <Payload, Data>(config: RequestConfig<Payload, Data>): (
    requestConfig: Partial<Omit<RequestConfig<Payload, Data>, 'data'>> & { data: Data },
  ) => Promise<ResponseResult<Payload>>

  <Payload, Data, Params>(config: RequestConfig<Payload, Data, Params>): (
    requestConfig: Partial<Omit<RequestConfig<Payload, Data, Params>, 'data' | 'params'>> &
    (Data extends undefined ? { data?: undefined } : { data: Data }) & { params: Params },
  ) => Promise<ResponseResult<Payload>>

  <Payload, Data, Params, Args extends object>(config: RequestConfig<Payload, Data, Params, Args>): (
    requestConfig: Partial<Omit<RequestConfig<Payload, Data, Params, Args>, 'data' | 'params' | 'args'>> &
    (Data extends undefined ? { data?: undefined } : { data: Data }) &
    (Params extends undefined ? { params?: undefined } : { params: Params }) & {
      args: Args
    },
  ) => Promise<ResponseResult<Payload>>
}

export type { AxiosInstance } from 'axios'
