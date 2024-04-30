<template>
<div class="row row-cols-1 row-cols-md-3 g-3" >
  <div class="col" v-for="restorant in restorants" :key="restorant.id">
<RestorantCard :restorant="restorant"></RestorantCard>
</div>
</div>
</template>

<script lang="ts">
import store from '@/store';
import { Options, Vue } from 'vue-class-component';
import RestorantCard from './Common/RestorantCard.vue'
@Options({
  components:{
    RestorantCard
  },
  props: {
   
  }
})
export default class Restorants extends Vue {
  get restorants(){
    return store.getters.availableRestorants;
  }


  
}
</script>
<style scoped>
.price-badge{
  position:absolute;
  top:0;
  right: 0;
  font-size:xx-small
}
</style>
