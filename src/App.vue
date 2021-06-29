<template>
  <v-app>
    <NavBar></NavBar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Home from '@/views/Home.vue'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  // metaInfo: {
  //   title: 'Podcasts, Articles, Prices, and More!',
  //   titleTemplate: '%s | The Crypto Masters',
  //   content: 'Helping You Master an Understanding of Crypto Assets. Your crypto one-stop shop!'
  // },
  metaInfo() {
    return {
      meta: [
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: `${this.$router.currentRoute.path}` },
        { property: 'og:title', content: 'Podcasts, Articles, Prices, and More! | The Crypto Masters' },
        { property: 'og:description', content: 'Helping You Master an Understanding of Crypto Assets.' },
        { property: 'og:image', content: require('../public/meta_tag_logo.png') },

        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:url', content: `${this.$router.currentRoute.path}` },
        { property: 'twitter:title', content: 'Podcasts, Articles, Prices, and More! | The Crypto Masters'},
        { property: 'twitter:description', content: 'Helping You Master an Understanding of Crypto Assets.' },
        { property: 'twitter:image', content: require('../public/meta_tag_logo.png')  },
      ]
    }
  },
  components: {
    Home,
    NavBar,
    Footer
  },
  data () {
    return {}
  }
}
</script>

<style>
div[data-app='true'] {
  background: url('assets/crypto_shattered.png') center center fixed !important;
  background-size: cover;
}
</style>