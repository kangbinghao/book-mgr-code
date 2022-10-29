import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "about" */ '../views/Auth/indexView.vue')
  },
  {
    path: '/',
    name: 'BasicLayout',
    component: () => import(/* webpackChunkName: "BasicLayout" */ '../layout/BasicLayout/indexView.vue'),
    // 子路由
    children:[
      {
        path: 'books',
        name: 'Books',
        component: () => import(/* webpackChunkName: "books" */ '../views/books/index.vue')
      },
      // 根据id显示对应商品详情页面路由
      {
        path: 'books/:id',
        name: 'BookDetail',
        component: () => import(/* webpackChunkName: "books" */ '../views/BookDetail/index.vue')
      },
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "user" */ '../views/Users/index.vue')
      },
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
