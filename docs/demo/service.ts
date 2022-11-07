import request from './request';

export async function fetchUser() {
  return request<string>('/api/user', {
    method: 'GET',
  })
}

export async function fetchUser1() {
  return request<string>('/api/user', {
    method: 'GET',
    getResponse: false,
  })
}

export async function fetchUser2() {
  return request<string>('/api/user', {
    method: 'GET',
    getResponse: true,
  })
}

export async function fetchUserError() {
  return request<string>('/api/userError')
}
