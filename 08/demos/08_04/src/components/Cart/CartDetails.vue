<template>
 
                <b-card title="Order Items" class="cart-container">
                    <b-list-group >
  <b-list-group-item :key="item.product.id" v-for="item in cart.items"  class="flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">
        <b-avatar  :src="item.product.image"></b-avatar>
            {{ item.product.name }}
      </h5>
      <small class="text-end">
        ${{ item.product.price * item.quantity }} 
        <br/>
        <small>${{ item.product.price }} x <b>{{ item.quantity }}</b></small>
      </small>
    </div>

    <p class="mb-1">
    </p>

  </b-list-group-item>
  </b-list-group>
  
  <b-alert :modelValue="isCartEmpty" variant="warning">
    You haven't selected any items yet. 
  </b-alert>
 
  <b-card-footer>
    <b-alert v-model="createdOrder" variant="success" dismissible>
  Order was <b>{{ createdOrder.orderCode }}</b> created successfully!. Navigate to orders to see your order details and status, or proceed to add new items to create a new order.
</b-alert>
                    <b-button class="float-end" :disabled="isCartEmpty || isCreatingOrder"  @click="checkout" variant="success" >
                     <span v-if="isCreatingOrder">
                      <b-spinner></b-spinner> Submitting your order...
                     </span > 
                   <span v-else>
                    Checkout <b-badge variant="light">$ {{ totalAmount }}</b-badge>
                   </span>
                  </b-button>
                </b-card-footer>
                </b-card>
</template>
    
<script lang="ts">
import store from '@/store';
import { Options, Vue } from 'vue-class-component';

@Options({
    components: {
    },
    props: {
       
    }
})
export default class CartDetails extends Vue {
    

 isCreatingOrder = false;
 createdOrder:any = null;
 currentCountDownSecond = 0;
  get isCartEmpty(){
    return this.cart.items.length == 0;
  }
    get cart() {
        return store.getters.cart;
    }

    get totalAmount(){
        return this.cart.items.reduce((acc:number, item:any) => acc + (item.product.price * item.quantity), 0);
    }
   checkout(){
    this.isCreatingOrder=true;
    store.dispatch('checkout').then((res:any)=>{
        console.log('orderresult',res);
        this.isCreatingOrder=false;
      this.createdOrder=res;
      this.$router.replace({name:'orderdetails', params:{id:res.id}})
      this.$emit('ordercreated',res)
      })
   }

}
</script>
<style scoped>
.cart-container{
    /* min-width:350px;
    max-height:400px;
    overflow:auto; */
}
</style>
    