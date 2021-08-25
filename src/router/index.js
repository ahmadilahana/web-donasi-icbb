import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Tv from '../views/TableTv.vue'
import Cookies from 'js-cookie'
// import axios from 'axios'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/to-tv',
    name: 'tv',
    component: Tv,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/data-donasi',
    name: 'DataDonasi',
    component: () => import('../views/DataDonasi.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!Cookies.get('token')) {
      if (to.path === '/to-tv') {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
