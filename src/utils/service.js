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

export const getNote = (params) => {
    return axios.get('/api/note/list')
}

export const getDetail = (id) => {
    return axios.get(`/api/bill/detail?id=${id}`)
}

export const complete = (params) => {
    let data = {
        "messages": [],
        "model": "deepseek-chat",
        "frequency_penalty": 0,
        "max_tokens": 2048,
        "presence_penalty": 0,
        "response_format": {
            "type": "text"
        },
        "stop": null,
        "stream": false,
        "stream_options": null,
        "temperature": 1,
        "top_p": 1,
        "tools": null,
        "tool_choice": "none",
        "logprobs": false,
        "top_logprobs": null
    }
    data.messages = params.message
    return axios.post('https://api.deepseek.com/chat/completions', JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer sk-e871f771cfc540598d3df1fade0098bc'
        }
    })
}
