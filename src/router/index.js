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
    path: '/journal',
    component: Layout,
    redirect: '/journal/index/read',
    index: true,
    name: 'Journal',
    meta: {
      name: '教师工作管理',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        // redirect: 'index/read',
        component: () => import('@/views/journal/journal/journal.vue'),
        meta: { title: '教师工作管理', icon: 'dashboard' },
        children: [{
          path: 'read',
          name: 'Read',
          component: () => import('@/views/journal/readJournal/readJournal.vue'),
          meta: {
            title: '看日志',
            icon: 'dashboard'
          }
        }, {
          path: 'write',
          name: 'Write',
          component: () => import('@/views/journal/writeJournal/writeJournal.vue'),
          meta: {
            title: '写日志',
            icon: 'dashboard'
          }
        }]
      }
    ]
  },

  {
    path: '/progress',
    component: Layout,
    redirect: '/progress/attendance',
    name: 'Progress',
    meta: { title: '实习过程管理', icon: 'form' },
    children: [
      {
        path: 'attendance',
        name: 'Attendance',
        component: () => import('@/views/attendance/attendance'),
        meta: { title: '签到管理', icon: 'form' },
      },
      {
        path: 'logMarking',
        name: 'LogMarking',
        component: () => import('@/views/logMarking/logMarking'),
        meta: { title: '日志批阅', icon: 'form' },
      }, {
        path: 'internshipSummary',
        name: 'InternshipSummary',
        component: () => import('@/views/internship/summary/summary.vue'),
        meta: {
          title: '实习总结批阅',
          icon: 'form'
        }
      }, {
        path: 'internshipPlanning',
        name: 'InternshipPlanning',
        component: () => import('@/views/internship/planning/planning.vue'),
        meta: {
          title: '实习计划批阅',
          icon: 'form'
        }
      }, {
        path: 'internshipFinish',
        name: 'InternshipFinish',
        component: () => import('@/views/internship/finish/finish.vue'),
        meta: {
          title: '实习结束申请',
          icon: 'form'
        }
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

