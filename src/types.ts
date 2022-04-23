import { ErrorShowType } from './config';

import type {
  AxiosResponse,
  AxiosRequestConfig,
} from 'axios';

export interface RequestData<D = any> {
  /** 状态码 */
  code: number;
  /** 数据 */
  data: D,
  /** 报错信息 */
  message: string;
  /** 错误信息类型 */
  showType?: ErrorShowType;
  [key: string]: any;
}

interface Adaptor {
  (resData: any, response: AxiosResponse): RequestData;
}

export interface FormatResultAdaptor {
  (res: AxiosResponse): any;
}

export interface RequestError extends Error {
  data?: any;
  info?: RequestData;
}

interface ErrorHandler {
  (error: RequestError, opts: AxiosRequestConfig & { skipErrorHandler?: boolean }, config: RequestConfig): void;
}

export interface RequestConfig extends AxiosRequestConfig {
  errorConfig?: {
    errorPage?: string;
    // adaptor 用以用户将不满足接口的后端数据修改成 errorInfo
    adaptor?: Adaptor;
    errorHandler?: ErrorHandler;
    defaultNoneResponseErrorMessage?: string;
    defaultRequestErrorMessage?: string;
  };
  formatResultAdaptor?: FormatResultAdaptor;
}

export interface Request {
  (
    url: string,
    opts: AxiosRequestConfig & { skipErrorHandler?: boolean },
  ): Promise<AxiosResponse<any, any>>;
}
