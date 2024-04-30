<template>
  <div>
    <b-table striped hover :fields="tableFields" :items="orders" show-empty>
      <template #cell(amount)="data">
       $ {{ data.item.amount  }}
      </template>
      <template #cell(orderCode)="data">
     
        <router-link :to="{name:'orderdetailsbycode',params:{orderCode:data.item.orderCode}}">
         {{ data.item.orderCode  }}  
        </router-link>

        
      </template>
      <template #cell(id)="data">
     
     <router-link :to="{name:'orderdetails',params:{id:data.item.id}}">
      {{ data.item.id  }}  
     </router-link>

     
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
            key: 'id',
            label: 'Id',
            sortable: false
          },
      {
            key: 'orderCode',
            label: 'Code',
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
   