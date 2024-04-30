<template>
    <div class="container-fluid h-100" >
  <nav class="navbar  navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
   
    <div class="">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" >Profile</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" >Billing</a>
        </li>
       
      </ul>
     
    </div>
  </div>
</nav>
<div class="row app-content no-gutters" >
  <div class="data-container col" >
    Route Content Displays Here
  </div>
  
</div>
 </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
@Options({
  components: {
  
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

</style>
