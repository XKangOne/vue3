// 自定义axios实例
import axios from 'axios'
// 引入useCookies 使有东西能取
// import { useCookies } from '@vueuse/integrations/useCookies';
// 换成使用util.js
import { getToken} from '~/composables/auth'
// import {ElNotification} from 'element-plus'
import { toast } from '~/composables/util';

const service = axios.create({
    baseURL:"http://127.0.0.1:4523/m1/2571712-0-default/api"
})
// 添加请求拦截
service.interceptors.request.use(function(config){
    // 从cookie 中取出 token
    // const cookie = useCookies()
    // const token = cookie.get('admin-token')
    const token =getToken();
    
    //如果不空 向header 中添加token
    if(token){
        config.headers['token'] = token
    }
    return config;
},function(error){ 
    // 对于请求出错，可以做的处理
    return Promise.reject(error)
})
// 添加相应拦截
service.interceptors.response.use(function(res){
    // 对返回值进行处理 解析
    return res.data;
},function (error){
    // 对于相应错误信息的处理
    // ElNotification({
    //     message: error.response.data.message || '请求失败',
    //     type:'error',
    //     duration:2000
    // })
    toast('登录失败','error')
    return Promise.reject(error)
})

export default service