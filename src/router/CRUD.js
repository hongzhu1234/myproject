
import axios from '@/router/axios';
//import { getUrl, postUrl, deleteUrl, putUrl } from '@/utils/CRUD'
//get请求
export const getUrl = (url, data) => {
    return axios.get(url, { params: data });
}

//delete请求
export const deleteUrl = (url, data) => {
    return axios.delete(url, { params: data })
}

//post请求
export const postUrl = (url, data) => {
    return axios.post(url, data)
}

//put请求
export const putUrl = (url, data) => {
    return axios.put(url, data)
}