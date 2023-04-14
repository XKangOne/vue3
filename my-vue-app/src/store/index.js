import { defineStore } from 'pinia'
import { adminLogin, getInfo, logout } from '~/api/admin'
import { setToken, removeToken } from '~/composables/auth'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    token:'',
    //管理员信息
    adminInfo: {},
  }),
  actions: {
    // 登录
    adminLogin(username, password) {
      return new Promise((resolve, reject) => {
        adminLogin(username, password).then((res) => {
          setToken(res.data.token)
          resolve(res)
        }).catch(err => reject(err))
      })
    },
    // 获取当前登录者信息
   async getInfo() {
    const res = await getInfo()
    console.log(res)
    this.adminInfo = res.data
      // return new Promise((resolve, reject) => {
      //   getInfo().then((res) => {
      //     this.adminInfo = res.data
      //     resolve(res)
      //   }).catch(err => reject(err))
      // })
    },
    // 退出登录
    async adminLogout(){
      //调用登出接口
      logout()
      //移除 cookie 里的token
      removeToken()
      //清空状态
      this.adminInfo = {}
    }
  }
})
