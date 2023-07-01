import axios from 'axios'

const BASE_URL = 'https://newsapi.org/'
const API_KEY = '06039f9f95e94a01a9f3871f0eb46701'

const instance = axios.create({
  baseURL: BASE_URL
})
// 送出 request 之前
instance.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${API_KEY}`
    return config
  },
  (error) => {
    console.log(`news api instance request: error`)
    console.log(error)
  }
)
// 收到 response 之後
instance.interceptors.response.use(
  (response) => {
    console.log(`news api instance response: response`)
    console.log(response)
    return response
  },
  (error) => {
    console.log(`news api instance response: error`)
    console.log(error)
    return error
  }
)

/**
 * 送出 request
 * @param {string} method - 方法
 * @param {string} url - 網址
 * @param {obj} data - request parameters
 * @returns 
 */
const req = ( method, url, data=null ) => {
  method = method.toLowerCase()
  switch (method) {
    case 'post':
      return instance.post(url, data);
    case 'get':
      return instance.get(url, { params: data });
    case 'delete':
      return instance.delete(url, { params: data });
    case 'put':
      return instance.put(url, data);
    case 'patch':
      return instance.patch(url, data);
    default:
      console.log(`Method not existed: ${method}`);
      return false;
  }
}

const apiNewsEverything = (data=null) => {
  return req('get', 'v2/everything', data)
}
const apiNewsTopHeadlines = (data=null) => {
  return req('get', 'v2/top-headlines', data)
}

export {
  apiNewsEverything,
  apiNewsTopHeadlines
}