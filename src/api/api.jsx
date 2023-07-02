import axios from 'axios'

/**
 * 產生呼叫 api 的 request
 * @param {object} obj
 * @param {string} obj.baseUrl - 網址
 * @returns 
 */
const createRequest = ({ baseUrl }) => {
  const createResult = (response) => {
    return {
      statusCode: (response?.status) ? response.status : 0,
      result: (response?.data) ? response.data : {},
      errorMessage: (response?.errorMessage) ? response.errorMessage : ''
    }
  }

  const instance = axios.create({
    baseURL: baseUrl
  })
  // 送出 request 之前
  instance.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      console.error('request api failed:', error)
      return createResult({
        errorMessage: 'There is something wrong, please reconnect and restart the page.'
      })
    }
  )
  // 收到 response 之後
  instance.interceptors.response.use(
    (response) => {
      return createResult(response)
    },
    (error) => {
      if (error?.response) {
        return createResult(error.response)
      }
      if (!window.navigator.onLine) {
        return createResult({
          errorMessage: 'There is something wrong with the network, please reconnect and restart the page.'
        })
      }
      console.error('response api failed:', error)
      return createResult({
        errorMessage: 'There is something wrong, please reconnect and restart the page.'
      })
    }
  )

  /**
   * 送出 request
   * @param {string} method - 方法
   * @param {string} url - 網址
   * @param {obj} data - request parameters
   * @param {obj} config 
   * @returns 
   */
  const request = ( method, url, data=null, config=null) => {
    method = method.toLowerCase()
    const mergeConfig = config ? {...config} : {}

    switch (method) {
      case 'post':
        return instance.post(url, data, mergeConfig);
      case 'get':
        return instance.get(url, { params: data, ...mergeConfig });
      case 'delete':
        return instance.delete(url, { params: data, ...mergeConfig });
      case 'put':
        return instance.put(url, data, mergeConfig);
      case 'patch':
        return instance.patch(url, data, mergeConfig);
      default:
        console.error('Method not existed:', method);
        return false;
    }
  }

  return { request }
}

export {
  createRequest
}