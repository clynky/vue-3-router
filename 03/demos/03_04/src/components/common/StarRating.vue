<template>
    <div class="d-flex justify-content-between align-items-center">
            <div class="ratings">
                <FontAwesomeIcon v-for="index in 5" :key="index" :class="[index<=rate?'rating-color':'']" :icon="starIcon"></FontAwesomeIcon>
                
            </div>
            <h5 class="review-count">{{ totalReviews }} Reviews</h5>
        </div>
    </template>
    
    <script lang="ts">
    import { Options, Vue } from 'vue-class-component';
    import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

    @Options({
        components:{
            FontAwesomeIcon
        },
      props: {
        rate: Number,
        totalReviews: Number,
      }
    })
    export default class StarRating extends Vue {
        rate!: number
        totalReviews!: number
        starIcon=faStar
    }
    </script>
    <style scoped>

.ratings{
    margin-right:10px;
}


.rating-color{
    color:#fbc634 !important;
}

.review-count{
    font-weight:400;
    margin-bottom:2px;
    font-size:16px !important;
}


</style>