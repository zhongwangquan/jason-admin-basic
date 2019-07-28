import axios from './axios'

export const login = (userInfo) => {
  return axios({
    url: '/api/login',
    method: 'get',
    params: {
      account: JSON.parse(userInfo).account,
      password: JSON.parse(userInfo).password
    }
  })
}

export const getUser = () => {
  return axios({
    url: '/user',
    method: 'get'
  })
}

export const getMenu = data => {
  return axios({
    url: '/menu',
    method: 'post',
    data
  })
}

// 默认全部导出
export default {
  login,
  getUser,
  getMenu
}
