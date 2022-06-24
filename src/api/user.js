/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-24 21:22:05
 * @LastEditors: your name
 * @Description: 
 */

import request from '@/utils/request'

export function loginApi(data) {
  return request({
    url: '/api/admin/login',
    method: 'post',
    data
  })
}

// 恢复登录
export function getInfo() {
  return request({
    url: '/api/admin/whoami',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}


// 修改用户
export function setUser(data) {
  return request({
    url: '/api/admin',
    method: 'PUT',
    data
  })
}