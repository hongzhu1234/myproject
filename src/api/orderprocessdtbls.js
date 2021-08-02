import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/orderProcessDtbls/load',
    method: 'get',
    params
  })
}

export function loadForRole(roleId) {
  return request({
    url: '/orderProcessDtbls/loadForRole',
    method: 'get',
    params: { appId: '', firstId: roleId }
  })
}

export function add(data) {
  return request({
    url: '/orderProcessDtbls/add',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/orderProcessDtbls/update',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/orderProcessDtbls/delete',
    method: 'post',
    data
  })
}

