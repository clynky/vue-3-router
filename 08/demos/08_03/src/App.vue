<template>
  <HomeView/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HomeView from '@/views/HomeView.vue'; // @ is an alias to /src

@Options({
  components: {
    HomeView,
  },
})
export default class App extends Vue {}
</script>
<style>
.active-route{
  color:orange!important;
}
.exact-active-route{
  
  color:white!important;
  background-color: orange!important;
  border-radius: 10px;
}
</style>