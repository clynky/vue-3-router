<template>
    <div class="container-fluid">
        <div class="row" v-if="restorant">
            <div class="col-12">
                <b-button variant="link" @click="goBack">Back</b-button>
            </div>
            <div class=" col-sm-12 col-md-5">
                <div class="card">
                    <img :src="restorant.image" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{ restorant.name }}</h5>
                        <p class="card-text">
                            {{ restorant.description }}
                        </p>
                        <hr />
                        <StartRating :totalReviews="restorant.totalReviews" :rate="restorant.rate" />
                        <hr />
                        <p class="card-text">
                            Usually arrives within <b>{{ restorant.timeToServe }} minutes</b>
                        </p>
                    </div>

                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Top Products</h5>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item" :key="product.id" v-for="product in topProducts">

                                    <b-avatar :src="product.image"></b-avatar>

                                    {{ product.name }}
                                </li>

                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            <div class="col-sm-12 col-md-7">
                <b-list-group>
                    <b-list-group-item v-for="product in restorant.products" :key="product.id"
                        class="flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">
                                <b-avatar :src="product.image"></b-avatar>
                                {{ product.name }} <b-badge>
                                    $ {{ product.price }}
                                </b-badge>
                            </h5>
                            <small>
                                <button type="button" @click="addToCart(product.id)" class="btn btn-light btn-sm float-end">
                                    <FontAwesomeIcon :icon="faPlus"></FontAwesomeIcon>

                                </button>

                            </small>
                        </div>

                        <p class="mb-1">
                            {{ product.description }}
                        </p>

                        <small>Donec id elit non mi porta.</small>
                    </b-list-group-item>

                </b-list-group>


            </div>
        </div>
        <div class="row" v-else>
            <div class="col">
                The restorant you are looking for could not be found
                {{ $route }}
            </div>
        </div>
    </div>
</template>
    
<script lang="ts">
import store from '@/store';
import router from '@/router'
import { Options, Vue } from 'vue-class-component';
import StartRating from '../common/StarRating.vue'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate'
])
@Options({

    components: {
        StartRating,
        FontAwesomeIcon
    },
    props: {
        restorantId: {
            type: String,
            required: true
        }
    }
})
export default class RestorantDetails extends Vue {
    restorantId!: string
    faPlus = faPlus;
    get restorant() {
        return store.getters.availableRestorants.find((z: { id: string; }) => z.id == this.restorantId);
    }
    get topProducts() {
        return this.restorant.products.slice(0, 4);
    }
    addToCart(productId: string) {
        store.dispatch('addToCart', this.restorant.products.find((z: any) => z.id == productId));
    }
    goBack() {
        if(history.state.back){
            router.back();
        }
        else{
            router.push({name:'restorants'})
        }
    }
    beforeRouteEnter(to: any, from: any) {
        // called before the route that renders this component is confirmed.
        // does NOT have access to `this` component instance,
        // because it has not been created yet when this guard is called!
        console.log('beforeRouteEnter', to, from)
    }
    beforeRouteUpdate(to: any, from: any) {
        // called when the route that renders this component has changed, but this component is reused in the new route.
        // For example, given a route with params `/users/:id`, when we navigate between `/users/1` and `/users/2`,
        // the same `UserDetails` component instance will be reused, and this hook will be called when that happens.
        // Because the component is mounted while this happens, the navigation guard has access to `this` component instance.
        console.log('beforeRouteUpdate', to, from)
    }
    beforeRouteLeave(to: any, from: any) {
        // called when the route that renders this component is about to be navigated away from.
        // As with `beforeRouteUpdate`, it has access to `this` component instance.
        if (store.state.cart.items.length > 0) {
            const answer = window.confirm('Do you really want to leave? You have not completed your order!')
            if (!answer) return false
        }

    }
}
</script>
<style scoped>
.price-badge {
    position: absolute;
    top: 0;
    right: 0;
    font-size: xx-small
}
</style>
    