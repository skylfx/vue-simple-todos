import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import vuemoment from 'vue-moment';

Vue.use(ElementUI);
Vue.use(vuemoment);

new Vue({
  el: '#app',
  render: h => h(App)
})
