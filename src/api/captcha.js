/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-17 11:18:22
 * @LastEditors: your name
 * @Description: 获取验证码
 */

import request from '@/utils/request'

export function getCaptcha() {
  return request({
    url: '/res/captcha',
    method: 'get',
  })
}