import request from './request';

export async function fetchUsername() {
  return request<string>('/api/username', {
    method: 'GET',
  })
}

export async function fetchUsername1() {
  return request<string>('/api/username', {
    method: 'GET',
    getResponse: false,
  })
}

export async function fetchUsername2() {
  return request<string>('/api/username', {
    method: 'GET',
    getResponse: true,
  })
}
