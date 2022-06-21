/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-21 20:21:52
 * @LastEditors: your name
 * @Description: 通用方法
 */

/**
 * 
 * @param {String||Number} timestamp 时间戳
 * @descripton 时间格式转化
 */
export function formatDate(timestamp) {
  timestamp = parseInt(timestamp)
  const date = new Date(timestamp)

  let year = date.getFullYear();
  let month = String.prototype.padStart.call((date.getMonth() + 1), 2, '0');
  let day = String.prototype.padStart.call((date.getDate()), 2, '0');

  let hour = String.prototype.padStart.call((date.getHours()), 2, '0')
  let minute = String.prototype.padStart.call((date.getMinutes()), 2, '0')
  let second = String.prototype.padStart.call((date.getSeconds()), 2, '0')

  const weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  let week = weekArr[date.getDay()]

  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second + ' ' + week
}