// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Home from '@/components/Home'
Vue.config.productionTip = false

/* eslint-disable no-new */

Vue.component('navigationMenu',{
   template : '<Home/>'
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

new Vue({
  el: '#navigationMenu',
  components: { Home },
  template: '<Home/>'
})
