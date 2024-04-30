<template>
    <GMapMap  class="h-100" v-if="center" :center="center" :zoom="15"  map-type-id="roadmap" >
        <!-- <GMapCluster>
      <GMapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
      />
    </GMapCluster> -->
    <GMapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :icon= "{
          url: require('@/assets/logo-small.svg'),
          scaledSize: {width: 50, height: 50},
      }"
      :closeclick="true"
      @click="openMarker(m.id)" 
          @closeclick="openMarker(null)"
    >
    <GMapInfoWindow   :opened="openedMarkerID === m.id">
       <RestorantMarker :restorant="m.restorant"></RestorantMarker>
      </GMapInfoWindow>
    </GMapMarker>
    
    </GMapMap>
</template>
    
<script lang="ts">
import store from '@/store';
import { Options, Vue } from 'vue-class-component';
import RestorantMarker from './RestorantMarker.vue'
//@ts-ignore
import randomLocation from 'random-location'

@Options({
    components: {
        RestorantMarker
    },
    props: {

    }
})
export default class RestorantsNearMe extends Vue {
    locationDetectionFailed=false;
    openedMarkerID:number|null= null
    center:{ lat: number; lng: number; } | null={lat:40.486261958681595,lng:-111.89040333141902};
    markers:any[]=[];
    get restorants() {
        return store.getters.availableRestorants
    }
    openMarker(id:number|null) {
        console.log('click called')
       this.openedMarkerID = id
    }

    created() {
    //    let randomPoint= randomLocation.randomCirclePoint({latitude: 37.7749, longitude: -122.4194}, 1000)
    //    console.log('random point',randomPoint)
    
   this.restorants.forEach((restorant:any)=>{
    const randomPoint=randomLocation.randomCirclePoint ({latitude:this.center?.lat, longitude: this.center?.lng}, 1000)

    this.markers.push({
        restorant:restorant,
        id:restorant.id,
        position:{
            lat:randomPoint.latitude,
            lng:randomPoint.longitude
        }
    })
   })
}


    



}
</script>
<style scoped></style>

<style>
/* set this globally for the GMap component */
.vue-map-container{
    height:100%;
}
</style>