import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const Restorants = () => import('../components/Restorants/Restorants.vue')
const Orders = () => import('../components/Orders/Orders.vue')
const RestorantsNearMe = () => import('../components/Maps/RestorantsNearMe.vue')
const AdminView = () => import('@/views/AdminView.vue')
const PageNotFound = () => import('../components/Generic/PageNotFound.vue')
const RestorantDetails = () => import('../components/Restorants/RestorantDetails.vue')
const OrderDetails = () => import('../components/Orders/OrderDetails.vue')
const GoogleLogin = () => import('../components/Login/GoogleLogin.vue')
const Analytics = () => import('../components/Analytics/Analytics.vue')
const UserProfile = () => import('@/components/Admin/UserProfile.vue')
const Billing = () => import('@/components/Admin/Billing.vue')
const CartDetails = () => import('@/components/Cart/CartDetails.vue')

import { authService } from '@/services/auth.service'
import store from '../store'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'restorants' },
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/restorants',
    name: 'restorants',
    components: {
      default: Restorants,
      'right-sidebar': RestorantsNearMe
    },
    meta: {
      title: 'My Restorants',
      requiresAuth: false
    }
  },
  {
    path: '/restorants/:id(\\d+)',
    name: 'restorantdetails',
    props: {
      default: route => {
        return {
          restorantId: route.params.id
        }
      },
      'right-sidebar': router => {
        return {

        }
      }
    },
    components: {
      default: RestorantDetails,
      'right-sidebar': CartDetails
    },
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/orders/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
    name: 'orderdetails',
    props: true,
    component: OrderDetails,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/orders/:orderCode',
    name: 'orderdetailsbycode',
    props: true,
    component: OrderDetails,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/nearme',
    name: 'nearme',
    component: RestorantsNearMe,
    meta: {
      requiresAuth: false,
      requiresLocation: true
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    redirect: { name: 'profile' },
    meta: {
      requiresAuth: true
    },
    children: [

      {
        path: 'profile',
        name: 'profile',
        component: UserProfile,
      },
      {
        path: 'billing',
        name: 'billing',
        component: Billing,
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: GoogleLogin,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/analytics',
    name: 'analytics',
    component: Analytics,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: PageNotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes

});
router.beforeEach(async (to, from) => {
  if (to.meta?.requiresAuth && !authService.isLoggedIn()) {
    //perform auth checks
    const loggedIn = await authService.login();
    if (!loggedIn) return '/login'
  }
})

router.beforeResolve(async (to, from) => {
  if (to.meta?.requiresLocation) {
    try {
      await getCurrentLocation();
    }
    catch (error) {
      return false;
    }
  }
})

router.afterEach((to, from) => {
  store.dispatch('collectAnalytic', { path: to.fullPath })
  document.title = "QuickBite: " + (to.meta?.title ?? '');
})

function getCurrentLocation(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          resolve({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        (error: any) => {
          reject(error);
        }
      )

    }
    else {
      reject('Geolocation is not enabled.')
    }
  })
}
export default router;