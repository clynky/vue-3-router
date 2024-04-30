import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Restorants from '../components/Restorants/Restorants.vue'
import Orders from '../components/Orders/Orders.vue'
import RestorantsNearMe from '../components/Maps/RestorantsNearMe.vue'
import AdminView from '@/views/AdminView.vue'
import PageNotFound from '../components/Generic/PageNotFound.vue'
import RestorantDetails from '../components/Restorants/RestorantDetails.vue'
import OrderDetails from '../components/Orders/OrderDetails.vue'

const routes:Array<RouteRecordRaw> =[
  {
    path:'/',
    redirect: {name:'restorants'}
  },
  {
    path:'/restorants',
    name:'restorants',
    component:Restorants
  },
  {
   path:'/restorants/:id(\\d+)',
   name:'restorantdetails',
   props:route=>{
    return {
      restorantId:route.params.id
    }
   },
   component:RestorantDetails
  },
  {
    path:'/orders',
    name:'orders',
    component:Orders
  },
  {
    path:'/orders/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
    name:'orderdetails',
    props: true,
    component:OrderDetails
   },
   {
    path:'/orders/:orderCode',
    name:'orderdetailsbycode',
    props: true,
    component:OrderDetails
   },
  {
    path:'/nearme',
    name:'nearme',
    component:RestorantsNearMe
  },
  {
    path:'/admin',
    name:'admin',
    component:AdminView
  },
  {
    path:'/:pathMatch(.*)*',
    component:PageNotFound
  }
];

const router= createRouter({
  history:createWebHistory(),
  routes:routes

});

export default router;