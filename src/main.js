import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource';
import axios from 'axios';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './my-theme/index.less';
//import fullcalendar from 'fullcalendar/dist/fullcalendar.min';
//import 'fullcalendar/dist/fullcalendar.min.css';


Vue.config.productionTip = false
Vue.use(VueResource);
Vue.use(iView);
Vue.prototype.$ajax = axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
