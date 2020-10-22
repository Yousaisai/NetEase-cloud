/*
 * @Descripttion: 全局引入
 * @Author: Mr.You
 * @Date: 2020-10-12 14:47:41
 * @LastEditTime: 2020-10-21 20:56:54
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import IconSvg from '@/components/SvgIcon/index.vue'
Vue.use(ElementUI);
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
 
Vue.use(VideoPlayer)

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