import { proxy } from 'ajax-hook';

proxy({
  onRequest: (config, handler) => {
    console.log(config)
    if (config.url === '/api/users') {
      handler.resolve({
        config,
        status: 200,
        headers: {
          'content-type': 'application/json'
        },
        response: {
          code: 0,
          data: [],
          message: 'success'
        }
      })
      return;
    }

    handler.next(config)
  }
})
