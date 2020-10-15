/*
 * @Descripttion: 全局引入
 * @Author: Mr.You
 * @Date: 2020-10-12 14:47:41
 * @LastEditTime: 2020-10-15 15:34:49
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import IconSvg from '@/components/SvgIcon/index.vue'
Vue.use(ElementUI);


import './icons' // icon
// import './icons/index.js'
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title =to.meta.title + " - Mr.You "
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')