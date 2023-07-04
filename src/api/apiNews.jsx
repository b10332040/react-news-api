import { createRequest } from "./api"

const { request } = createRequest({ baseUrl: '/api/' })

const config = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NEWS_API_KEY}`,
  },
}

const apiNewsEverything = (data=null) => {
  return request('get', 'v2/everything', data, config)
}
const apiNewsTopHeadlines = (data=null) => {
  return request('get', 'v2/top-headlines', data, config)
}
const getApiNewsResult = (response) => {
  if (Object.keys(response.result) !== 0) {
    return {
      statusCode: response.statusCode,
      ...response.result
    }
  }
  return {
    statusCode: 0,
    status: 'error',
    message: (response.errorMessage !== '') ? response.errorMessage : 'There is something wrong, please reconnect and restart the page.'
  }
}

export {
  apiNewsEverything,
  apiNewsTopHeadlines,
  getApiNewsResult
}