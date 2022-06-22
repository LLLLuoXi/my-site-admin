import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '控制台', icon: 'dashboard', auth: true }
    }]
  },
  {
    path: '/banner',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Banner',
        component: () => import('@/views/banner/index'),
        meta: { title: '首页标语', icon: 'el-icon-reading', auth: true }
      }
    ]
  },

  {
    path: '/blog',
    component: Layout,
    redirect: '/blog',
    name: 'Blog',
    meta: { title: '文章管理', icon: 'el-icon-document-copy' },
    children: [
      {
        path: '/blogList',
        name: 'BlogList',
        component: () => import('@/views/blogList/index'),
        meta: { title: '文章列表', icon: 'table', auth: true }
      },
      {
        path: '/blogType',
        name: 'BlogType',
        component: () => import('@/views/blogType/index'),
        meta: { title: '文章分类', icon: 'tree', auth: true }
      },
      {
        path: '/addBlog',
        name: 'AddBlog',
        component: () => import('@/views/addBlog/index'),
        meta: { title: '添加文章', icon: 'el-icon-document-add', auth: true }
      },
      {
        path: '/editBlog/:id',
        name: 'EditBlog',
        hidden: true,
        component: () => import('@/views/editBlog/index'),
        meta: { title: '编辑文章', icon: 'el-icon-document-add', auth: true }
      }
    ]
  },
  {
    path: '/demo',
    component: Layout,
    redirect: '/demo',
    name: 'Demo',
    meta: { title: '项目管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/demoList',
        name: 'DemoList',
        component: () => import('@/views/demoList/index'),
        meta: { title: '项目列表', icon: 'table', auth: true }
      },
      {
        path: '/addDemo',
        name: 'AddDemo',
        component: () => import('@/views/addDemo/index'),
        meta: { title: '添加项目', icon: 'el-icon-document-add', auth: true }
      },
    ]
  },
  {
    path: '/comment',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Comment',
        component: () => import('@/views/comment/index'),
        meta: { title: '评论管理', icon: 'el-icon-chat-line-square', auth: true }
      }
    ]
  },
  {
    path: '/message',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Message',
        component: () => import('@/views/message/index'),
        meta: { title: '留言板', icon: 'el-icon-message', auth: true }
      }
    ]
  },
  {
    path: '/about',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'About',
        component: () => import('@/views/about/index'),
        meta: { title: '关于我', icon: 'el-icon-question', auth: true }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Setting',
        component: () => import('@/views/setting/index'),
        meta: { title: '设置', icon: 'el-icon-setting', auth: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
