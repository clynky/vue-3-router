<template>
  <div class="container-fluid">
      <div class="row">
          <div class="col-4">
            <b-card>
  <b-card >
    <b-card-title>
     #{{ order.orderCode }}
    </b-card-title>
    <b-card-subtitle>
      {{ order.items.length }} items
    </b-card-subtitle>
    <b-card-text>
   $ {{ order.amount }}
    </b-card-text>
    <a class="card-link">My order didn't arrive</a>
  </b-card>
</b-card>
          </div>
          <div class="col-8">
            <b-list-group>
  <b-list-group-item :key="item.product.id" v-for="item in order.items"  class="flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1"><b-avatar :src="item.product.image"></b-avatar> {{ item.product.name }}</h5>
      <small> {{ item.product.price  }} x {{ item.quantity }} = $ {{ item.product.price * item.quantity }} </small>
    </div>

    <p class="mb-1">
      {{ item.product.description }}
        </p>

    <small>
      <a>
         {{ item.restorant.name }}  
      </a>
    </small>
  </b-list-group-item>

  </b-list-group>
           
          </div>
      </div>
  </div>
</template>
  
<script lang="ts">
import store from '@/store';
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
  },
  props: {
      id: {
          type: String,
          required: true
      }
  }
})
export default class OrderDetails extends Vue {
  id!: string
  get order() {
      return store.getters.orders.find((z: { id: string; }) => z.id == this.id);
  }
  

}
</script>
<style scoped>

</style>
  