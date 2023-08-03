import { proxy } from 'ajax-hook';
import { message } from 'antd';
import { request, setConfig, } from '@pansy/request';

proxy({
  onRequest: (config, handler) => {
    if (config.url === '/api/user') {
      handler.resolve({
        config,
        status: 200,
        headers: {
          'content-type': 'application/json'
        },
        response: {
          code: 0,
          data: 'Tom',
          message: 'OK'
        }
      })
      return;
    }

    if (config.url === '/api/userError') {
      handler.resolve({
        config,
        status: 200,
        headers: {
          'content-type': 'application/json'
        },
        response: {
          code: 400100,
          message: '用户不存在'
        }
      })
      return;
    }

    handler.next(config)
  }
})

setConfig({
  errorConfig: {
    errorHandler: (error) => {
      const info = error.message;

      const skipErrorHandler = info.config?.skipErrorHandler;

      if (skipErrorHandler === true) return;

      if (info.code === 'ERROR_RESPONSE_DATA') {
        const errorMessage = info.message;

        errorMessage && message.error(errorMessage);
      }

      throw error;
    },
  }
});

export default request;
