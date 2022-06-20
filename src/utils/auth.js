/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-20 22:31:15
 * @LastEditors: your name
 * @Description: 
 */

import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  // return Cookies.remove(TokenKey)
  localStorage.removeItem('adminToken')
}
