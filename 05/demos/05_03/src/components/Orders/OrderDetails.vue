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
                   <router-link :to="{name:'restorantdetails',params:{id:item.restorant.id}}">{{item.restorant.name }}</router-link>

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
          type: Number,
          required: false
      },
      orderCode: {
          type: String,
          required: false
      }
  }
})
export default class OrderDetails extends Vue {
  id!: number
  orderCode!: string
  get order() {
    if(this.id)
      return store.getters.orders.find((z: { id: number;   }) => z.id == this.id);
    else if(this.orderCode)
      return store.getters.orders.find((z: { orderCode: string;   }) => z.orderCode == this.orderCode);
    else
      return null;
  }
  

}
</script>
<style scoped>

</style>
  