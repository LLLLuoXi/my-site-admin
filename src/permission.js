/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-20 22:58:16
 * @LastEditors: your name
 * @Description: 
 */
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  // const hasToken = getToken()


  // 获取本地用户信息
  const hasGetUserInfo = store.getters.user;
  if (to.meta.auth) {
    // 需要鉴权
    if (hasGetUserInfo) {
      // vuex有用户信息，直接放行
      next()
    } else {
      console.log('没有用户信息');
      // 没有用户信息 看是否有token信息
      const hasToken = localStorage.getItem('adminToken')
      if (hasToken) {
        // 验证token有效性
        try {
          // whoami
          const result = await store.dispatch('user/getInfo')
          console.log('result', result);
          next()
        } catch (error) {
          console.log('发生了错误')
          await store.dispatch('user/resetToken')
          Message.error(`登录过期，请重新登录`)
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }

      } else {
        // 无token 重新登录
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }

  } else {
    // 不需要鉴权
    if (to.path === '/login' && hasGetUserInfo) {
      // 登录状态下去login 导航到首页
      next({ path: '/' })
    } else {
      next()
    }
    NProgress.done()
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
