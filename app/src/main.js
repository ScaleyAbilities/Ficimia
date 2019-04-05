import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

import router from './router'

Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
