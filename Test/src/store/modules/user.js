import { login, logout, getInfo } from '@/api/system/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    userInfo: '',
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
    organName:'',
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_USERINFO: (state, value) => {
      state.userInfo = value
    },
    SET_ORGANNAME: (state, organName) => {
      state.organName = organName
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) { 
      const username = userInfo.username.trim()
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid  
      const loginOrganId = userInfo.loginOrganId
      return new Promise((resolve, reject) => {
        //login(username, password, code, uuid).then(res => {
        login(username, password, code, uuid, loginOrganId).then(res => {
          if (res.code == 200) {
            setToken(res.data)
            //提交上面的mutaions方法
            commit('SET_TOKEN', res.data)
            resolve() //then处理
          } else {
            console.log('login error ' + res);
            reject(res) //catch处理
          }
        }).catch(err => {
          reject(err);
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          const data = res.data
          const avatar = data.user.avatar == "" ? require("@/assets/image/profile.jpg") : data.user.avatar;

          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
            commit('SET_PERMISSIONS', data.permissions)
          } else {
            commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          //console.log('--- 获取用户信息 user--organ  -----')   
          //console.log(JSON.stringify(data.user))     
          commit('SET_ORGANNAME', data.user.loginOrganName) 
          commit('SET_NAME', data.user.realName)
          commit('SET_AVATAR', avatar)
          //yy-add
          commit('SET_USERINFO', data.user) 
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 退出系统
    LogOut({ commit, state }) {
      console.log('退出登录')
      return new Promise((resolve, reject) => {
        logout().then((res) => {
          removeToken() // 必须先移除token
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', []) 
          //yy-add
          commit('SET_NAME', '')
          commit('SET_ORGANNAME', '') 
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user