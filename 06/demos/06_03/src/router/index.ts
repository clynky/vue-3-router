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
import Analytics from '../components/Analytics/Analytics.vue'
import UserProfile from '@/components/Admin/UserProfile.vue'
import Billing from '@/components/Admin/Billing.vue'
import store from '../store'
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
      title:'My Restorants',
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
      requiresAuth:false,
      requiresLocation:true
    }
  },
  {
    path:'/admin',
    name:'admin',
    component:AdminView,
    redirect: {name:'profile'},
    meta:{
      requiresAuth:true
    },
    children:[
      
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
    meta:{
      requiresAuth: false
    }
  },
   {
    path:'/analytics',
    name:'analytics',
    component:Analytics,
    meta:{
      requiresAuth:false
    }
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
router.beforeEach(async (to,from)=>{
   if(to.meta?.requiresAuth && !authService.isLoggedIn()){
    //perform auth checks
    const loggedIn= await authService.login();
    if(!loggedIn) return '/login'
   }
})

router.beforeResolve(async (to,from)=>{
if(to.meta?.requiresLocation){
  try{
    await getCurrentLocation();
   }
    catch(error){
      return false;
    }
}
})

router.afterEach((to, from) => {
  store.dispatch('collectAnalytic',{path:to.fullPath})
  document.title= "QuickBite: " + (to.meta?.title??'');
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