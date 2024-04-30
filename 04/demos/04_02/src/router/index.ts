import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Restorants from '../components/Restorants/Restorants.vue'
import Orders from '../components/Orders/Orders.vue'
import RestorantsNearMe from '../components/Maps/RestorantsNearMe.vue'
import AdminView from '@/views/AdminView.vue'
import PageNotFound from '../components/Generic/PageNotFound.vue'
import RestorantDetails from '../components/Restorants/RestorantDetails.vue'
import OrderDetails from '../components/Orders/OrderDetails.vue'
import { authService } from '@/services/auth.service'
import GoogleLogin from '../components/Login/GoogleLogin.vue'

const routes:Array<RouteRecordRaw> =[
  {
    path:'/',
    redirect: {name:'restorants'},
    meta:{
      requiresAuth:false
    }
  },
  {
    path:'/restorants',
    name:'restorants',
    component:Restorants,
    meta:{
      requiresAuth:false
    }
  },
  {
   path:'/restorants/:id(\\d+)',
   name:'restorantdetails',
   props:route=>{
    return {
      restorantId:route.params.id
    }
   },
   component:RestorantDetails,
   meta:{
     requiresAuth:false
   }
  },
  {
    path:'/orders',
    name:'orders',
    component:Orders,
    meta:{
      requiresAuth:true
    }
  },
  {
    path:'/orders/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
    name:'orderdetails',
    props: true,
    component:OrderDetails,
    meta:{
      requiresAuth:true
    }
   },
   {
    path:'/orders/:orderCode',
    name:'orderdetailsbycode',
    props: true,
    component:OrderDetails,
    meta:{
      requiresAuth:true
    }
   },
  {
    path:'/nearme',
    name:'nearme',
    component:RestorantsNearMe,
    meta:{
      requiresAuth:false
    }
  },
  {
    path:'/admin',
    name:'admin',
    component:AdminView,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: GoogleLogin,
    meta:{
      requiresAuth: false
    }
  },
  {
    path:'/:pathMatch(.*)*',
    component:PageNotFound,
    meta:{
      requiresAuth:false
    }
  }
];

const router= createRouter({
  history:createWebHistory(),
  routes:routes

});
router.beforeEach(async (to,from)=>{
  if(to.meta?.requiresAuth && !authService.isLoggedIn()){
    const loggedIn= await authService.login();
    if(!loggedIn) return '/login'
  }
})
export default router;