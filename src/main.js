import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
// import Vuetify from 'vuetify/lib';

Vue.config.productionTip = false

// export default new Vuetify({
//   theme: { dark: true },
// })

// export default new Vuetify({
//   theme: {
//     themes: {
//       light: {
//         primary: '#264653',
//         secondary: '#2A9D8F',
//         success: '#2A9D8F',
//         cmYellow: '#E9C46A',
//         accent: '#F4A261',
//         error: '#E76F51',
//       },
//     },
//   },
// })

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
