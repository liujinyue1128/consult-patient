import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { useUserStore } from '@/stores'
NProgress.configure({
  showSpinner: false // 去掉进度条转圈的样式
})

// vue3路由是怎么初始化的
// 1. 如何得到路由实例---vueRouter-createRouter()
const router = createRouter({
  // 2. 控制路由模式？
  // history模式：createWebHistory，hash模式:createWebHashHistory
  // history: createWebHashHistory(import.meta.env.BASE_URL), // hash模式路由

  // 3. 路由的基础路径,默认参数为'/'
  // history: createWebHistory('/heima'), // history模式路由

  history: createWebHashHistory(import.meta.env.BASE_URL), // hash模式路由

  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      meta: { title: '登录' }
    },
    {
      path: '/user/patient',
      component: () => import('@/views/User/PatientPage.vue'),
      meta: { title: '健康档案' }
    },
    {
      path: '/consult/fast',
      component: () => import('@/views/Consult/consultFast.vue'),
      meta: { title: '急速问诊' }
    },
    {
      path: '/consult/dep',
      component: () => import('@/views/Consult/ConsultDep.vue'),
      meta: {
        title: '选择科室'
      }
    },
    {
      path: '/consult/illness',
      component: () => import('@/views/Consult/ConsultIllness.vue'),
      meta: {
        title: '病情描述'
      }
    },
    {
      path: '/roomStatus',
      component: () => import('@/views/Room/index.vue'),
      meta: {
        title: '问诊室'
      },
      beforeEnter(to) {
        if (to.query.payResult === 'false') return '/user/consult'
      }
    },
    {
      path: '/consult/pay',
      component: () => import('@/views/Consult/ConsultPay.vue'),
      meta: {
        title: '问诊支付'
      }
    },
    {
      path: '/user/consult',
      component: () => import('@/views/User/ConsultPage.vue'),
      meta: {
        title: '问诊记录'
      }
    },
    {
      path: '/login/callback',
      component: () => import('@/views/login/LoginCallback.vue'),
      meta: {
        title: 'QQ登录-绑定手机'
      }
    },
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),

      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('@/views/Home/index.vue'),
          meta: { title: '首页' }
        },
        {
          path: '/notify',
          meta: { title: '消息通知' },
          component: () => import('@/views/Notify/index.vue')
        },
        {
          path: '/article',
          component: () => import('@/views/Article/index.vue'),
          meta: { title: '健康百科' }
        },
        {
          path: '/user',
          component: () => import('@/views/User/index.vue'),
          meta: { title: '个人中心' }
        }
      ]
    },
    {
      path: '/consult/medicine',
      component: () => import('@/views/Consult/ConsultMedicine.vue'),
      meta: {
        title: '开药门诊'
      }
    },
    {
      path: '/consult/choose',
      component: () => import('@/views/Consult/ConsultChoose.vue'),
      meta: {
        title: '选择药品'
      }
    },
    {
      path: '/consult/medicineDetail/:id',
      component: () => import('@/views/Consult/ConsultMedicineDetail.vue'),
      meta: {
        title: '药品详情'
      }
    },
    // {
    //   path: '/consult/medicineAction',
    //   component: () => import('@/views/Consult/ConsultMedicineAction.vue'),
    //   meta: {
    //     title: '开药'
    //   }
    // },
    {
      path: '/consult/doctor',
      component: () => import('@/views/Consult/ConsultDoctor.vue'),
      meta: {
        title: '找医生'
      }
    },
    {
      path: '/doctorList/:depId',
      component: () => import('@/views/Consult/ConsultDoctorList.vue'),
      meta: {
        title: '医生搜索'
      }
    }
  ]
})
// 全局前置路由守卫---访问权限控制
router.beforeEach((to) => {
  NProgress.start()
  // 获取token
  const store = useUserStore()

  //白名单
  const whiteList = ['/login', '/login/callback']
  // 如果当前没有token且不在白名单内，直接跳转到login
  if (!store.user?.token && !whiteList.includes(to.path)) return '/login'
})

// 全局后置路由守卫-设置页面title
router.afterEach((to) => {
  document.title = `${to.meta.title || ''}-vue3项目`
  NProgress.done()
})
// console.log(import.meta) 只有vite环境下才会有env属性的存在
export default router
