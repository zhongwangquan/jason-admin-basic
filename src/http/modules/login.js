import axios from '../axios'
// 登录
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
// 登出
export const logout = () => {
  return axios({
    url: '/api/logout',
    method: 'get'
  })
}
