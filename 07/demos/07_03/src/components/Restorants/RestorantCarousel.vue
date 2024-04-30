<template>
  <b-carousel
   
    style="text-shadow: 0px 0px 2px #000"
    :interval="400"
    v-model="slide"
      controls
      indicators
  >
    <b-carousel-slide v-for="restorant in restorants" :key="restorant.id"
      :caption="restorant.name"
      :img-src="restorant.image"
    ></b-carousel-slide>
    
  </b-carousel> 

</template>

<script lang="ts">
import store from '@/store';
import { Options, Vue } from 'vue-class-component';

@Options({
  components:{
  },
  props: {
   
  }
})
export default class Restorants extends Vue {
  slide = 0;
  get restorants(){
    return store.getters.availableRestorants;
  }


  
}
</script>
<style scoped>

</style>
