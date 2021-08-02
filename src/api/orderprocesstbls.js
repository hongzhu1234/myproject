import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/orderProcessTbls/load',
    method: 'get',
    params
  })
}

export function loadForRole(roleId) {
  return request({
    url: '/orderProcessTbls/loadForRole',
    method: 'get',
    params: { appId: '', firstId: roleId }
  })
}

export function add(data) {
  return request({
    url: '/orderProcessTbls/add',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/orderProcessTbls/update',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/orderProcessTbls/delete',
    method: 'post',
    data
  })
}

