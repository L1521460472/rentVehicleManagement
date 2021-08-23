// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from "axios";
import router from './router'
import store from './store'
import "babel-polyfill";
import components from '@/components/aacommon/aacommon.js'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from "element-ui";
import './assets/icon/iconfont.css'
import {getCookie,formatJE,formatDate} from '@/public.js'

Vue.config.productionTip = false
Vue.use(ElementUI,{ size: 'small' });
axios.defaults.timeout=30000;
Vue.prototype.$axios=axios;
Vue.prototype.$getCookie=getCookie
Vue.prototype.$getHeaders=function($this){
  let headers={
    "Authorization": getCookie("HTBD_PASS"),
    "language": $this.$store.state.language,
  }
  return headers
}
Vue.prototype.$formatJE=formatJE
Vue.prototype.$formatDate=formatDate

Vue.use(components);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted(){
       // import("@/theme/dartgray.css")
       let theme=getCookie('theme')
       theme=theme?theme:'dartgray'
       import(`@/theme/${theme}.css`)
  }
})
