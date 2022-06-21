/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-21 22:17:28
 * @LastEditors: your name
 * @Description: 
 */

import request from '@/utils/request'

// 分页获取博文
export function getBlogByPage(page = 1, limit = 10) {
  return request({
    url: '/api/blog',
    method: 'get',
    params: {
      page,
      limit
    }
  })
}

// 删除文章
export function deleteOneBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: 'delete',
  })
}