import Vue from 'vue'
import App from './App.vue'
import router from "@/router/router";
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/validators'
Vue.use(BootstrapVue)
new Vue({
  render: h => h(App),

  router
}).$mount('#app')