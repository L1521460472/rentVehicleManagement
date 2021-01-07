// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import "babel-polyfill";
import components from '@/components/aacommon/aacommon.js'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from "element-ui";
import './assets/icon/iconfont.css'
import './theme/dartgray.css'

Vue.config.productionTip = false
Vue.use(ElementUI,{ size: 'small' });

Vue.use(components);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
