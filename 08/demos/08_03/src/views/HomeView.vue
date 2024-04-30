<template>
    <div class="container-fluid h-100" >
  <nav class="navbar  navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">
      <img src="@/assets/logo.svg" alt=""  height="60">
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'restorants'}">Restorants</router-link>
        </li>
        <li class="nav-item">
        <router-link class="nav-link" :to="{name:'orders'}">Orders</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{name:'nearme'}">Near ME</router-link>
      </li>
      <li class="nav-item ">
       <router-link class="nav-link" :to="{name:'admin'}">Account</router-link>
      </li>
      <li class="nav-item ">
       <router-link class="nav-link" :to="{name:'analytics'}">Analytics</router-link>
      </li>
        <li class="nav-item ">
          <router-link class="nav-link" to="/dummypage"><span class="text-danger">404</span></router-link>
        </li>
        
      </ul>
      <form class="d-flex">
        <CartSummary />
        <GoogleLogin />
      </form>
    </div>
  </div>
</nav>
<div class="row app-content no-gutters" >
  <div class="data-container col" >
   
    <router-view v-slot="{ Component,route }">
    <transition name="custom-classes"
  :enter-active-class="route.meta.transitionEnter || 'animate__animated animate__slideInLeft'"
  leave-active-class="">
    <component :is="Component" />
  </transition>
</router-view>
   

  </div>
  <div class="data-container col-4 hideIfEmpty" >
   <router-view name="right-sidebar"></router-view>
  </div>
 
</div>
 </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import GoogleLogin from '@/components/Login/GoogleLogin.vue'
import CartSummary from '@/components/Cart/CartSummary.vue'
@Options({
  components: {
    GoogleLogin,
    CartSummary
  },
})
export default class HomeView extends Vue {
 
}
</script>
<style scoped>
.app-content{
  /* margin-top: 56px; */
  height:calc(100% - 90px);
  overflow:auto;
}
.data-container{
  height:100%;
  overflow:auto;
}
.hideIfEmpty:empty{
  display:none;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
