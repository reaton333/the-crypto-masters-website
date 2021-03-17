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
* {
  font-family: 'Montserrat', sans-serif;;
}
</style>