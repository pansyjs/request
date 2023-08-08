import axios from 'axios';
import type { IRequestConfig } from './types';

export enum ErrorShowType {
  /** 不做处理 */
  SILENT = 0,
  /** 全局提示 - 警告 */
  WARN_MESSAGE = 1,
  /** 全局提示 - 异常 */
  ERROR_MESSAGE = 2,
  /** 通知提醒 */
  NOTIFICATION = 3,
  /** 重定向 */
  REDIRECT = 9,
}

export const defaultConfig: IRequestConfig = {
  errorConfig: {
    errorThrower: (res) => {
      const { data } = res;

      if (data?.success === false) {
        const error = new axios.AxiosError(
          data.message || 'Request failed with response data',
          'ERROR_RESPONSE_DATA',
          res.config,
          res.request,
          res
        );

        throw error;
      }
    },
  },
  formatData: (data = {}) => {
    return {
      ...data,
      success: data.code === 0,
    }
  }
}
