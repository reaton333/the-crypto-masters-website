<template>
  <v-app>
    <NavBar></NavBar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer 
      app
      absolute
    >
      This is a footer
    </v-footer>
  </v-app>
</template>

<script>
import Home from '@/views/Home.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    Home,
    NavBar
  },
}
</script>

<style>

</style>
