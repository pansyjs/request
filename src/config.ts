import type { AxiosRequestConfig } from '@pansy/axios';

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

export const defaultConfig: AxiosRequestConfig = {
  validateDataStatus(data = {}) {
    return {
      success: data.code === 0,
      message: data.message,
    }
  },
}
