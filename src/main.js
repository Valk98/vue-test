import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import store from './store'
import router from "@/router/router"

import './permission'
import './styles/index.scss'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false



new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App),
})
