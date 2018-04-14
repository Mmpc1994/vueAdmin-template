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

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

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
    path: '/authority',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Authority',
        component: () => import('@/views/authority/authority'),
        meta: { title: '权限管理', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/school',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'School',
        component: () => import('@/views/school/school'),
        meta: { title: '学校管理', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/school',
    hidden: true,
    component: Layout,
    children: [
      {
        path: 'create',
        name: 'SchoolCreate',
        component: () => import('@/views/school_create/school_create'),
        meta: { title: '添加学校', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/studentAndTeacherResource',
    component: Layout,
    redirect: '/studentAndTeacherResource/major',
    name: 'StudentAndTeacherResource',
    meta: { title: '师生资源管理', icon: 'form' },
    children: [
      {
        path: 'major',
        name: 'Major',
        component: () => import('@/views/studentAndTeacherResource/major/major'),
        meta: { title: '专业管理', icon: 'form' },
      }, {
        path: 'class',
        name: 'Class',
        component: () => import('@/views/studentAndTeacherResource/class/class'),
        meta: { title: '班级管理', icon: 'form' },
      }, {
        path: 'teacher',
        name: 'Teacher',
        component: () => import('@/views/studentAndTeacherResource/teacher/teacher'),
        meta: { title: '教师管理', icon: 'form' },
      }, {
        path: 'student',
        name: 'Student',
        component: () => import('@/views/studentAndTeacherResource/student/student'),
        meta: { title: '学生管理', icon: 'form' },
      }
    ]
  },

  {
    path: '/trainee',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'trainee',
        component: () => import('@/views/trainee/trainee'),
        meta: { title: '我的实习生', icon: 'peoples' }
      }
    ]
  },

  {
    path: '/logger',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'logger',
        component: () => import('@/views/logger/logger'),
        meta: { title: '教师工作记录管理', icon: 'example' }
      }
    ]
  },

  {
    path: '/session',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Session',
        component: () => import('@/views/marking/session/session'),
        meta: { title: '学期总结批阅', icon: 'example' }
      }
    ]
  },


  {
    path: '/progress',
    component: Layout,
    redirect: '/progress/punch',
    name: 'Progress',
    meta: { title: '实习过程管理', icon: 'form' },
    children: [
      {
        path: 'punch',
        name: 'punch',
        component: () => import('@/views/punch/punch'),
        meta: { title: '签到管理', icon: 'form' },
      },
      {
        path: 'remark',
        name: 'remark',
        component: () => import('@/views/remark/remark'),
        meta: { title: '日志批阅', icon: 'form' },
      },
      {
        path: 'summary',
        name: 'summary',
        component: () => import('@/views/marking/summary/summary'),
        meta: { title: '实习总结批阅', icon: 'form' },
      }
    ]
  },

  {
    path: '/organization',
    component: Layout,
    redirect: '/organization/classes',
    name: 'Organization',
    meta: { title: '班级群主管理', icon: 'example' },
    children: [
      {
        path: 'classes',
        name: 'Classes',
        component: () => import('@/views/classes/classes'),
        meta: { title: '班级管理', icon: 'table' }
      },
      {
        path: 'groups',
        name: 'Groups',
        component: () => import('@/views/groups/groups'),
        meta: { title: '群主管理', icon: 'tree' }
      }
    ]
  },

  {
    path: '/internship',
    component: Layout,
    redirect: '/internship/planning',
    name: 'Internship',
    meta: { title: '实习计划管理', icon: 'example' },
    children: [
      {
        path: 'planning',
        name: 'Planning',
        component: () => import('@/views/internship/planning/planning.vue'),
        meta: { title: '实习计划制定', icon: 'table' }
      },
      {
        path: 'verify',
        name: 'Verify',
        component: () => import('@/views/internship/verify/verify.vue'),
        meta: { title: '实习计划审核', icon: 'tree' }
      }
    ]
  },
  

  {
    path: '/trainingRoom',
    component: Layout,
    redirect: '/trainingRoom/table',
    name: 'Training',
    meta: { title: '实训室', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/room/room'),
        meta: { title: '实训室管理', icon: 'table' }
      },
      {
        path: 'reserve',
        name: 'Reserve',
        component: () => import('@/views/reserve/reserve'),
        meta: { title: '实训室预约', icon: 'tree' }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '通知公告', icon: 'message' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '收到的通知', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '实习文件', icon: 'tree' }
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

