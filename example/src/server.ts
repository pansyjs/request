import { proxy } from 'ajax-hook';

proxy({
  onRequest: (config, handler) => {
    if (config.url === '/api/users') {
      handler.resolve({
        config,
        status: 200,
        headers: {
          'content-type': 'application/json'
        },
        response: {
          success: true,
          code: 0,
          data: [],
          message: 'success'
        }
      })
      return;
    }

    if (config.url === '/api/users/data-error') {
      handler.resolve({
        config,
        status: 200,
        headers: {
          'content-type': 'application/json'
        },
        response: {
          success: false,
          code: 100001,
          data: [],
          message: '这是一个数据状态码异常'
        }
      })
      return;
    }

    if (config.url === '/api/users/http-error') {
      handler.resolve({
        config,
        status: 400,
        headers: {
          'content-type': 'application/json'
        },
        response: {
          success: false,
          code: 100002,
          message: '这是一个 Http 状态码异常'
        }
      })
      return;
    }

    handler.next(config)
  }
})
