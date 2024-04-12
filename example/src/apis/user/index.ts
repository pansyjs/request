import { request } from '@pansy/request'

const prefix = 'users'

export const fetchList = request({
  method: 'get',
  url: `${prefix}`
})

export const dataError = request({
  method: 'get',
  url: `${prefix}/data-error`
})

export const httpError = request({
  method: 'get',
  url: `${prefix}/http-error`
})
