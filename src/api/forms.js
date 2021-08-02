import request from '@/router/axios'

export function getList(params) {
  return request({
    url: '/api/Form/GetAllForm',
    method: 'get',
    params
  })
}

export function get(params) {
  return request({
    url: '/forms/get',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: '/forms/add',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/forms/update',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/forms/delete',
    method: 'post',
    data
  })
}

