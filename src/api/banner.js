/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-21 17:17:33
 * @LastEditors: your name
 * @Description: 
 */

import request from '@/utils/request'

// 获取首页标语
export function getBanner() {
  return request({
    url: '/api/banner',
    method: 'get',
  })
}

// 设置首页标语
export function setBanner(data) {
  return request({
    url: '/api/banner',
    method: 'post',
    data
  })
}
