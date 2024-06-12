import axios from "../utils/axios";

export const login = (params) => {
    return axios.post('/api/user/login', params)
}

export const getUserInfo = () => {
    return axios.get('/api/user/get_userinfo')
}

export const changePass = (params) => {
    return axios.post('/api/user/modify_pass', params)
}

export const upload = (params) => {
    return axios.post('/api/upload', params)
}

export const editUserInfo = (params) => {
    return axios.post('/api/user/edit_userinfo', params)
}

export const getCategory = (params) => {
    return axios.get('/api/type/list')
}

export const add = (params) => {
    return axios.post('/api/bill/add', params)
}

export const getList = (params) => {
    return axios.get(`/api/bill/list?type_id=${params.type_id}&page_size=${params.page_size}&page=${params.page}&date=${params.date}`)
}

export const getDetail = (id) => {
    return axios.get(`/api/bill/detail?id=${id}`)
}