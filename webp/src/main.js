
import Vue from 'vue'
import App1 from './App'
import router from './router'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App1/>',
  components: { App1 }
})
