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
          <a class="nav-link" >Restorants</a>
        </li>
        <li class="nav-item">
         <a class="nav-link" >My Orders</a>
        </li>
        <li class="nav-item">
         <a class="nav-link" >Near You</a>
        </li>
        <li class="nav-item ">
         <a class="nav-link" >Account</a>
        </li>
        <li class="nav-item ">
         <a class="nav-link" ><span class="text-danger">404</span></a>
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
 <img style="height:100%;width:100%" src="https://via.placeholder.com/1920x1080?text=Route%20Content%20Goes%20Here"/>
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
</style>
