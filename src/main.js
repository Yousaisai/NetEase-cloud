import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import IconSvg from '@/components/SvgIcon/index.vue'
Vue.use(ElementUI);
import './icons' // icon
import './icons/index.js'
Vue.config.productionTip = false
// Vue.component('icon-svg', IconSvg)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
