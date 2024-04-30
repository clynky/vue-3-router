<template>
    <GMapMap class="h-100" v-if="center" :center="center" :zoom="15" map-type-id="roadmap">
        <GMapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :icon="{
            url: require('@/assets/logo-small.svg'),
            scaledSize: { width: 50, height: 50 },
        }" :closeclick="true" @click="openMarker(m.id)" @closeclick="openMarker(null)">
            <GMapInfoWindow :opened="openedMarkerID === m.id">
                <RestorantMarker :restorant="m.restorant"></RestorantMarker>
            </GMapInfoWindow>
        </GMapMarker>

    </GMapMap>
    <div v-else-if="locationDetectionFailed" class="alert alert-danger">
        Location detection failed. Please enable location detection in your browser.
        </div>
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
    locationDetectionFailed = false;
    openedMarkerID: number | null = null
    center: { lat: number; lng: number; } | null = null;
    markers: any[] = [];
    get restorants() {
        return store.getters.availableRestorants
    }
    openMarker(id: number | null) {
        console.log('click called')
        this.openedMarkerID = id
    }

    async created() {
        this.getCurrentLocation().then((location: any) => {
            this.center = location
            this.restorants.forEach((restorant: any) => {
                const randomPoint = randomLocation.randomCirclePoint({ latitude: this.center?.lat, longitude: this.center?.lng }, 1000)

                this.markers.push({
                    restorant: restorant,
                    id: restorant.id,
                    position: {
                        lat: randomPoint.latitude,
                        lng: randomPoint.longitude
                    }
                })
            })
        }).catch((error: any) => {
            console.log(error)
            this.locationDetectionFailed = true;

        })


    }
    async getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(
                    (position: any) => {
                        resolve({ lat: position.coords.latitude, lng: position.coords.longitude });
                    },
                    (error: any) => {
                        reject(error);
                    }
                )

            }
            else {
                reject('Geolocation is not enabled.')
            }
        })
    }

}


</script>
<style scoped></style>

<style>
/* set this globally for the GMap component */
.vue-map-container {
    height: 100%;
}
</style>