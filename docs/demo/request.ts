import { proxy } from 'ajax-hook';
import { message, notification } from 'antd';
import { request, setConfig, ErrorShowType, } from '@pansy/request';

import type { ErrorHandler, RequestError } from '@pansy/request';

proxy({
  onRequest: (config, handler) => {
    let response;

    if (config.url.startsWith('/api/')) {
      response = {
        config,
        status: 200,
        headers: {
          'content-type': 'application/json'
        }
      }
    }

    if (config.url === '/api/username') {
      response.response = {
        code: 0,
        data: 'Tom',
        message: 'OK'
      }
    }

    if (config.url === '/api/usernameError') {
      response.response = {
        code: 400100,
        message: '用户不存在'
      }
    }

    if (response) {
      handler.resolve(response);
      return;
    }

    handler.next(response)
  }
})

const errorHandler: ErrorHandler = (error, opts) => {
  if (opts?.skipErrorHandler) throw error;

  if (error.name === 'BizError') {
    const errorInfo = error.info;

    const showType =  error.request?.options?.params?.showType || errorInfo?.showType;

    if (errorInfo) {
      const {
        message: errorMessage,
        code
      } = errorInfo;

      switch (showType) {
        case ErrorShowType.SILENT:
          // do nothong
          break;
        case ErrorShowType.WARN_MESSAGE:
          message.warn(errorMessage);
          break;
        case ErrorShowType.ERROR_MESSAGE:
          message.error(errorMessage);
          break;
        case ErrorShowType.NOTIFICATION:
          notification.open({
            description: errorMessage,
            message: code,
          });
          break;
        case ErrorShowType.REDIRECT:
          break;
        default:
          message.error(errorMessage);
      }
    } else if (error.response) {
      // Axios 的错误
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      message.error('Response status:', error.response.status);
    } else if (error.request) {
      // 请求已经成功发起，但没有收到响应
      message.error('None response! Please retry.');
    } else {
      // 发送请求时出了点问题
      message.error('Request error, please retry.');
    }
  }

  throw error;
}

setConfig({
  errorConfig: {
    errorHandler,
    errorThrower: (res: any) => {
      const { data, code, message, showType } = res;

      if (code !== 0) {
        const error: RequestError = new Error(message);
        error.name = 'BizError';
        error.info = {
          code,
          message,
          showType,
          data
        };

        throw error;
      }
    },
  }
});

export default request;
