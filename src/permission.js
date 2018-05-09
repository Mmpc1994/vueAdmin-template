import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken, getUserInfo } from '@/utils/auth.ts' // 验权

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (whiteList.indexOf(to.path) !== -1) {
    return next()
  }
  try {
    if (getToken() && getUserInfo()) {
      next()
    }
  } catch (e) {
    console.log(e);
    next({ path: '/login' })
  }
  // if (getToken()) {
  //   try {
  //     getUserInfo();
  //   } catch(e) {

  //   }
  //   console.log(to.path);
  //   if (to.path === '/login') {
  //     next({ path: '/' })
  //   } else {
  //     try {
  //       const userInfo = getUserInfo();
  //       console.log(object);
  //       if (userInfo) {
  //         next()
  //       }
  //     } catch(e) {
  //       console.log(1);
  //       next({ path: '/login' })
  //     }
  //   }
  // } else {
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     next()
  //   } else {
  //     next('/login')
  //     NProgress.done()
  //   }
  // }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
