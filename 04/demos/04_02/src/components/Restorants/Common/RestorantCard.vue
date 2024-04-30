<template>
  <div class="card m-2">
  <!-- v-slot="{ isActive, href, navigate }" -->
    <ProductCarousel :restorant="restorant" />
    <router-link
     :to="{ name: 'restorantdetails', params: { id: restorant.id } }"
      custom
    
       v-slot="{ navigate }">
      <div class="card-body" role="button" @click="navigate">
        <h5 class="card-title">
          {{ restorant.name }}
        </h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ restorant.timeToServe }} minutes</h6>
        <p class="card-text fs-6 text">
          {{ restorant.description }}
        </p>

        <hr />
        <StartRating :totalReviews="restorant.totalReviews" :rate="restorant.rate" />
      </div>

    </router-link>

  </div>
</template>
    
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import StartRating from '../../common/StarRating.vue'
import ProductCarousel from './ProductCarousel.vue'
@Options({
  components: {
    StartRating,
    ProductCarousel
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



}
</script>
<style scoped></style>
    