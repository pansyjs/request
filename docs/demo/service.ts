import request from './request';

export async function fetchUsername() {
  return request<string>('/api/username', {
    method: 'GET',
  })
}
