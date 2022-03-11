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

// import axios from 'axios';

export default {
  name: 'App',
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'The Crypto Masters - Your Crypto One-Stop-Shop',
    // all titles will be injected into this template
    titleTemplate: '%s | The Crypto Masters'
  },
  components: {
    Home,
    NavBar,
    Footer
  },
  data () {
    return {
      allCoins: [],
    }
  },
  mounted() {

    // this.allCoins = this.$session.get('allCoins')
    
    // if (!this.allCoins) {
    //   this.getAllCoins()
    // }
  },
  methods: {
    // async getAllCoins() {

    //   try {
    //       const baseURL = `https://api.coingecko.com/api/v3/search`
    //       const params = `?local=en`
    //       const fullPath = baseURL + params
    //       // console.log(fullPath)
    //       const res = await axios.get(fullPath)

    //       this.allCoins = res.data.coins;
    //       // console.log(this.allCoins)
    //       this.$session.set("allCoins", this.allCoins);
    //       this.$session.set("totalCoins", this.allCoins.length);
    //   } catch (e) {
    //       console.log(e);
    //   }

    // },
  }
}
</script>

<style>
div[data-app='true'] {
  background: url('assets/crypto_shattered.png') center center fixed !important;
  background-size: cover;
}
</style>