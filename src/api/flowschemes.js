import request from '@/router/axios'

export function getList(params) {
  return request({
    url:'/api/FlowScheme/GetFlowScheme',
    method:'get',
    params
  })
}

export function get(params) {
  return request({
    url: 'api/FlowScheme/get',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: '/api/FlowScheme/AddFlom',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/api/FlowScheme/EditForm',
    method: 'put',
    data
  })
}

export function del(data) {
  return request({
    url: '/api​/FlowScheme​/DeleteFlowScheme',
    method: 'delete',
    data
  })
}

