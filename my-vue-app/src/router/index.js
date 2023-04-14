// 引入
import { createRouter,createWebHistory } from 'vue-router'
import Index from '~/pages/index.vue'
import About from '~/pages/About.vue'
import NotFound from '~/pages/404.vue'
import Login from '~/pages/login.vue'
import Admin from '~/layouts/admin.vue'
// 创建路由数组
const routes =[
    {
        path:'/',
        name:'index',
        component:Admin,
        children:{
            path:'/',
            component:Index
        },
        meta:{
            title:'首页'
        }
    },
    {
        path:'/about',
        component:About,
        meta:{
            title:'关于'
        }
    },
    {
        path:'/login',
        component:Login,
        meta:{
            title:'登录页'
        }
    },
    {
        //随便输入什么值都会跳转到该页面
        path:'/:pathMatch(.*)*',
        name:'NotFound',
        component:NotFound,
        meta:{
            title:'404'
        }
    },
]
// 定义路由对象
const router = createRouter({
    history: createWebHistory(),
    routes
})
// 导出路由对象
export default router