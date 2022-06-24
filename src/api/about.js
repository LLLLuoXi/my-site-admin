/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-24 19:17:12
 * @LastEditors: your name
 * @Description: 
 */

import request from '@/utils/request'

export function getAbout() {
  return request.get("/api/about");
}

export function editAbout(data) {
  return request({
    url: '/api/about',
    method: 'post',
    data
  })
}