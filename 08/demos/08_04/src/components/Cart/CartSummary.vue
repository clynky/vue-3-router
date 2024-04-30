<template>
    <div  >
        <button id="cart" type="button" class="btn btn-success" @click="showCartDetails=true">
            <FontAwesomeIcon  :icon="faCartShopping"></FontAwesomeIcon>
         {{ cart.items.length }} items
</button>
  <b-modal hide-footer hide-header  v-model="showCartDetails">
    <CartDetails @ordercreated="showCartDetails=false"/>
</b-modal>
  <!-- <b-popover
      target="cart"
      triggers="click"
      :show="showCartDetails"
      @hidden="showCartDetails=false"
    >
      <template #title>
        <b-button @click="showCartDetails=false" class="close" aria-label="Close">
          <span class="d-inline-block" aria-hidden="true">&times;</span>
        </b-button>
        Cart
      </template>

  <CartDetails/>
    </b-popover> -->
</div>

</template>
    
<script lang="ts">
import store from '@/store';
import { Options, Vue } from 'vue-class-component';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import CartDetails from './CartDetails.vue';
@Options({
    components: {
        FontAwesomeIcon,
        CartDetails
    },
    props: {
       
    }
})
export default class CartSummary extends Vue {
    faCartShopping=faCartShopping
    showCartDetails=false
    get cart() {
        return store.getters.cart;
    }
   

}
</script>
<style scoped>

</style>
    