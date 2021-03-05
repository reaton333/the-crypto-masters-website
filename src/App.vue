<template>
  <div>
    <!-- <router-link :to="{ path: 'page=1'}">Home</router-link>  -->
    <!-- <router-link to="/coin">About</router-link> -->
    <NavBar></NavBar>
    <router-view></router-view>
  </div>
  <!-- <router-view/> -->
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
