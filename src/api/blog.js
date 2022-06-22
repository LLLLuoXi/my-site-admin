/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-22 14:23:23
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

// 添加文章
export function addBlog(data) {
  return request({
    url: '/api/blog',
    method: 'post',
    data
  })
}

// 编辑（更新）文章
// 调用接口需要传递一个信息对象 {id: 要修改文章id, data: 修改文章的所有内容}
export function editBlog(blogInfo) {
  return request({
    url: `/api/blog/${blogInfo.id}`,
    method: 'put',
    data: blogInfo.data
  })
}

// 根据id查找某一篇文章
export function findOneBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: 'get'
  })
}