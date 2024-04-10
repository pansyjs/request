import { request } from '@pansy/request'

const prefix = 'users'

/**
 * 获取请求列表
 */
export const fetchList = request({
  method: 'get',
  url: `${prefix}`
})
