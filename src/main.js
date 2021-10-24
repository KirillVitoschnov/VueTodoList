import Vue from 'vue'
import App from './App.vue'
import router from "@/router/router";
import '@/validators'

new Vue({
  render: h => h(App),

  router
}).$mount('#app')