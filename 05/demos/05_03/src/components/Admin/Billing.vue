<template>
    <b-card title="Billing Details">

        <div class="height-100 d-flex justify-content-center align-items-center">
            <div class="credit-card p-3">
                <div class="d-flex justify-content-between align-items-center">
                    <img src="https://i.imgur.com/gfp4wrR.png" width="50" />
                    <h1>VISA</h1>
                </div>
                <div class="px-2 number mt-3 d-flex justify-content-between align-items-center">
                    <span>****</span>
                    <span>****</span>
                    <span>****</span>
                    <span>1112</span>
                </div>
                <div class="p-4 card-border mt-4">
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="cardholder">Card Holder</span>
                        <span class="expires">Expires</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="name">John Doe</span>
                        <span class="date">**/**</span>
                    </div>


                </div>
            </div>



        </div>
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
.credit-card {
    border: none;
    width: 400px;
    border-radius: 12px;
    color: #fff;
    background-image: linear-gradient(to right top,#f7b600, #1a1f71);
}

.number span {

    font-size: 20px;
    font-weight: 600;
}

.cardholder,
.expires {
    font-weight: 600;
    font-size: 17px;
}

.name,
.date {

    font-size: 15px;

}

.card-border {

    border-top-left-radius: 30px !important;
    border-top-right-radius: 30px !important;
    border: none;
    border-radius: 6px;
    color: #fff;
}
</style>
