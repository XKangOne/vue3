import { defineStore } from 'pinia'
import { login, getInfo, logout } from '~/api/admin'
import { setToken, removeToken } from '~/composables/auth'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    //管理员信息
    adminInfo: {},
    sideWidth:'220px',
    menus:[]
  }),
  actions: {
    // 登录
    login(username, password) {
      return new Promise((resolve, reject) => {
        login(username, password).then((res) => {
          setToken(res.data.token)
          resolve(res)
        }).catch(err => reject(err))
      })
    },
    // 获取当前登录者信息
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfo().then((res) => {
          this.adminInfo = res.data.adminInfo
          this.menus = res.data.menus
          console.log(res.data.menus)
          resolve(res)
        }).catch(err => reject(err))
      })
    },
    // 退出登录
    logout() {
      return new Promise((resolve, reject) => {
        logout().then((res) => {
          // 移除 cookie里的 token
          removeToken()
          // 清空状态
          this.adminInfo = {}
          resolve(res)
        }).catch(err => reject(err))
      })
    },
    //伸缩
    handleSideWidth(){
      this.sideWidth = this.sideWidth === '220px' ? '80px' : '220px'
    }
  }
})

