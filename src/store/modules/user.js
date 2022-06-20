/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-20 23:20:50
 * @LastEditors: your name
 * @Description: 
 */

import { login, logout, getInfo, loginApi } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    // 登录后用户的信息
    user: null
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // SET_TOKEN: (state, token) => {
  //   state.token = token
  // },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // },
  SET_USER: (state, user) => {
    state.user = user
  }
}

const actions = {
  // user login

  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      loginApi(userInfo).then(res => {
        console.log(res);
        const { data } = res
        if (data) {
          commit('SET_USER', data)
          resolve()
        } else {
          reject()
        }
      })
    })

    // const { username, password } = userInfo
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // 回复登录状态
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 发送请求
      getInfo().then(res => {
        console.log('res', res)
        // if (typeof res === 'string') {
        //   // 未登录或token已经过期
        //   res = Json.parse(res)
        //   if (res.code === 401) {
        //     reject(res.msg)
        //   }
        // } else {
        //   // token是ok的 将用户信息放入仓库
        //   commit('SET_USER', res.data)
        //   resolve()
        // }
        if (!res.data) {
          // 未登录或token已经过期
          // res = JSON.parse(res)
          if (res.code === 401) {
            reject(res.msg)
          }
        } else {
          // token是ok的 将用户信息放入仓库
          commit('SET_USER', res.data)
          resolve()
        }
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

