import { createRouter, RouteRecordRaw, createWebHistory } from "vue-router"
import Restorants from '../components/Restorants/Restorants.vue'
import Orders from "../components/Orders/Orders.vue"
import RestorantsNearMe from "../components/Maps/RestorantsNearMe.vue"
import AdminView from '@/views/AdminView.vue'
import PageNotFound from "@/components/Generic/PageNotFound.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'restorants' }
  },
  {
    path: '/restorants',
    name: 'restorants',
    component: Restorants
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders
  },
  {
    path: '/nearme',
    name: 'nearme',
    component: RestorantsNearMe
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView
  },
  {
    path: '/:pathMatch(.*)',
    component: PageNotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router