<template>
  <b-carousel
  ride="carousel"
  :interval="5000"
    v-model="slide"
      controls
      indicators
  >
    <b-carousel-slide v-for="product in restorant.products" :key="product.id"
      :img-src="product.image"
    >
    <small class="fs-6 text">
      <b-badge > {{ product.name   }} </b-badge> <br/>
    <b-badge >$ {{ product.price }}</b-badge>
  </small>
  </b-carousel-slide>
    
  </b-carousel> 

</template>

<script lang="ts">
import store from '@/store';
import { Options, Vue } from 'vue-class-component';

@Options({
  components:{
  },
  props: {
    restorant: {
            type: Object,
            required: true
        }
  }
})
export default class Restorants extends Vue {
  restorant!: any
  slide = 0;
  get slides(){
    return this.restorant.products.map((z: {id:string, name: any; image: any; })=>({id:z.id,title:this.restorant.name, subTitle:z.name,image:z.image}))
 
  }


  
}
</script>
<style scoped>

</style>
