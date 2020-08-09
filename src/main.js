import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueBus from 'vue-bus'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'
import {VueHammer} from 'vue2-hammer'

Vue.config.productionTip = false
Vue.use(VueBus)
Vue.use(VueHammer)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
