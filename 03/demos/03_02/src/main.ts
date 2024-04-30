import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import './assets/styling/default.css'
import vue3GoogleLogin from 'vue3-google-login'
import BootstrapVueNext from 'bootstrap-vue-next'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import router from './router'

const app=createApp(App)
app.use(store);
app.use(vue3GoogleLogin, {
    clientId: '258256240295-6rq5sb9d6tpamcnhjiokurdvmok5shjg.apps.googleusercontent.com'
  })
app.use(BootstrapVueNext);
app.use(VueGoogleMaps, {
  load: {
      key: '',
  },
})
app.use(router);

app.mount('#app')
