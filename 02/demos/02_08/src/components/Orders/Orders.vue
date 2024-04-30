<template>
  <div>
    <b-table striped hover :fields="tableFields" :items="orders" show-empty>
      <template #cell(amount)="data">
       $ {{ data.item.amount  }}
      </template>
      <template #cell(orderCode)="data">
        <a>
          {{ data.item.orderCode  }}  
        </a>

        
      </template>
      <template #empty>
      <h6>You don't seem to have ordered anything yet. Go to your favorite restorant and order something</h6>
    </template>

    </b-table>
  </div>
  
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
    export default class Orders extends Vue {
      tableFields= [
      {
            key: 'orderCode',
            label: 'Order',
            sortable: false
          },
          {
            key: 'date',
            sortable: true
          },
          {
            key: 'amount',
            sortable: true
          },
          {
            key: 'totalItems',
            label: 'Total Items',
            sortable: true
          }
          
        ]
       get orders() {
        return store.getters.orders;
    }
  }
    </script>
   