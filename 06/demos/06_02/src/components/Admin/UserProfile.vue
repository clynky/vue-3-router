<template>
 
    <b-card title="User Profile">
     
      <b-list-group>
  <b-list-group-item><b-avatar :src="user.picture"></b-avatar></b-list-group-item>
  <b-list-group-item>{{ user.name }}</b-list-group-item>
  <b-list-group-item>{{ user.email }}</b-list-group-item>
  
</b-list-group>
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
export default class UserProfile extends Vue {
 get user() {
    return store.getters.currentUser;
    }
}
</script>
<style scoped>

</style>
