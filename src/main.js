import Vue from 'vue'
import VueMeta from 'vue-meta'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import PrismicVue from '@prismicio/vue'
import linkResolver from './link-resolver'


const accessToken = 'MC5ZRG1sNkJFQUFDSUF4cllj.77-977-977-977-9fjXvv71RMjNcdO-_vQbvv70Z77-977-9Qi3vv73vv73vv70zNjh5Yu-_vSI7ew'
const endpoint = 'https://the-crypto-masters-website.cdn.prismic.io/api/v2'

// Register plugin
Vue.use(PrismicVue, {
  endpoint,
  apiOptions: { accessToken },
  linkResolver
})

// Vue.mixin({
//   methods: {
//     linkToNewTab: function() {
//       alert('This is a test!')
//     }
//   }
// })


Vue.config.productionTip = false

Vue.use(VueMeta)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
