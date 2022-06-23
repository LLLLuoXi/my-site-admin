/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-24 00:24:07
 * @LastEditors: your name
 * @Description: 
 */
import request from '@/utils/request'

export function getMessages(page = 1, limit = 10) {
  return request.get("/api/message", {
    params: {
      page,
      limit,
    },
  });
}

export function delMessage(id) {
  return request.delete(`/api/message/${id}`);
}