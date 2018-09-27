import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   hidden: true,
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',
  //     component: () => import('@/views/dashboard/index')
  //   }]
  // },

  // {
  //   path: '/dashboard',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       meta: { title: '个人中心', icon: 'dashboard' }
  //     }
  //   ]
  // },
  {
    path: '/agent',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Anget',
        component: () => import('@/views/agent/agent'),
        meta: { title: '代理商管理', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/airTicket',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'AirTicket',
        component: () => import('@/views/air_ticket/air_ticket'),
        meta: { title: '机票订单', icon: 'form' }
      }
    ]
  },
  {
    path: '/service',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'ServiceCharges',
        component: () => import('@/views/service_charges/service_charges.vue'),
        meta: { title: '服务费管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/reportForm',
    component: Layout,
    meta: { title: '财务报表', icon: 'form' },
    children: [
      {
        path: 'consume',
        name: 'Consume',
        component: () => import('@/views/report_form/consume/consume'),
        meta: { title: '消费明细'},
      }, {
        path: 'ledger',
        name: 'Ledger',
        component: () => import('@/views/report_form/consume_ledger/consume_ledger'),
        meta: { title: '消费总账'},
      }, {
        path: 'recharge',
        name: 'Recharge',
        component: () => import('@/views/report_form/recharge/recharge'),
        meta: { title: '充值明细'},
      }, {
        path: 'refund',
        name: 'Refund',
        component: () => import('@/views/report_form/refund/refund'),
        meta: { title: '退款明细'},
      }
    ]
  },


  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

