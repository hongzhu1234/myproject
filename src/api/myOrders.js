import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/myOrders/load',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: '/myOrders/add',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/myOrders/update',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/myOrders/delete',
    method: 'post',
    data
  })
}

