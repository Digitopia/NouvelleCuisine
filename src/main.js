import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

Vue.config.productionTip = false

import VueHolder from 'vue-holderjs'
Vue.use(VueHolder)

new Vue({
  render: h => h(App),
}).$mount('#app')
