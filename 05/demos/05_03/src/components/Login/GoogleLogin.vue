<template>

    <div class="dropdown"  v-if="$store.getters.currentUser">
  <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
    <img v-if="$store.getters.currentUser.picture" :src="$store.getters.currentUser.picture" class="rounded me-2" height="30"> {{ $store.getters.currentUser.name }}
  </button>
  <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
    <li><a class="dropdown-item active" @click="logout" >Logout</a></li>
  </ul>
</div>
   <GoogleLogin v-else  :callback="googleCallback" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import store from '@/store'
import {authService} from '@/services/auth.service'
@Options({
  components: {
  },
})
export default class GLogin extends Vue {
  autoLogin=true;
  googleCallback(response:any){
   authService.processGoogleOneTapResponse(response)

  }
  logout(){
    store.commit('logout')
  }

}
</script>
