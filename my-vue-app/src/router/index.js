import {
    createRouter,
    createWebHistory
  } from 'vue-router'
  
  import Index from '~/pages/index.vue'
  import Login from '~/pages/login.vue'
  import NotFound from '~/pages/404.vue'
  import Admin from "~/layouts/admin.vue";
  import GoodsList from "~/pages/goods/list.vue";
  import Banners from "~/pages/goods/banners.vue";
  
  // 默认路由，所有用户共享
  const routes = [
    {
      path: "/",
      name: "admin",
      component: Admin
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        title: "登录页"
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
  
  // 动态路由，根据请求得到的菜单数据，动态添加路由
  const asyncRoutes = [
    {
      path: "/index",
      name: 'index',
      component: Index,
      meta: {
        title: "后台首页"
      }
    },
    {
      path: "/goods/list",
      name: 'goods-list',
      component: GoodsList,
      meta: {
        title: "商品管理"
      }
    },
    {
      path: "/goods/banners",
      name: 'goods-banners',
      component: Banners,
      meta: {
        title: "商品轮播图管理"
      }
    }
  ]
  
  export const router = createRouter({
    routes,
    history: createWebHistory()
  })
  
  // 动态添加路由的方法
  export function addRoutes(menus) {
    // 是否有新的路由
    let hasNewRoutes = false
    const findAndAddRoutesByMenus = (arr) => {
      arr.forEach(e => {
        //上面的path路径等于FMenu中的frontpath 路径相同 则匹配成功，为合法路由
        let item = asyncRoutes.find(o => o.path == e.frontpath)
        if (item && !router.hasRoute(item.path)) {
        //把匹配成功的对象添加进去
          router.addRoute("admin", item)
          hasNewRoutes = true
        }
        if (e.child && e.child.length > 0) {
          findAndAddRoutesByMenus(e.child)
        }
      })
    }
    findAndAddRoutesByMenus(menus)
    return hasNewRoutes
  }
// // 导出路由对象
// export default router