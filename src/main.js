import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource';
import axios from 'axios';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Format from './components/ut/DateFormat';

Vue.config.productionTip = false
axios.defaults.withCredentials=true;
Vue.use(VueResource);
Vue.use(iView);
Vue.prototype.$ajax = axios;
Vue.prototype.DateFormat = Format;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
