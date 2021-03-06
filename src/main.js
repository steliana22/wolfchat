import Vue from "vue";
import VueChatScroll from 'vue-chat-scroll';
import App from "./App.vue";
import router from "./router";

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCircle, faPlus, faSearch, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserCircle, faPlus, faSearch, faChevronRight, faChevronLeft)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;
Vue.use(VueChatScroll);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");