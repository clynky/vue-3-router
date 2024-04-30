<template>
  <b-card
    :title="restorant.name"
    :img-src="restorant.image"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
      {{ restorant.description }}
    </b-card-text>

    <a>{{ restorant.name }}</a>

  </b-card>
</template>
    
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    components: {
    },
    props: {
       restorant: {
           type: Object,
           required: true
       }
    }
})
export default class RestorantMarker extends Vue {
    restorant!:any;
   

}


</script>
<style scoped></style>
    