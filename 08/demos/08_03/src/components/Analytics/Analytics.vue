<template>
<div class="row " >
  <div class="col" >
    <b-list-group>
                    <b-list-group-item v-for="item in analytics" :key="item.id"
                       >
                        <b-badge>
                               {{ item.timestamp }}

                        </b-badge>
                        <br/>
                          
                        <!-- {{ item.data }} -->
                        <vue-json-pretty :data="item.data" />

                       
                    </b-list-group-item>

                </b-list-group></div>
</div>
</template>

<script lang="ts">
import store from '@/store';
import { Options, Vue } from 'vue-class-component';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
@Options({
  components:{
    VueJsonPretty
  },
  props: {
   
  }
})
export default class Analytics extends Vue {
  get analytics(){
    return store.getters.analytics;
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
