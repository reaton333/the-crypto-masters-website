<template>
    <div>
      <v-navigation-drawer
        v-model="drawer"
        temporary
        bottom
        dark
        class="primary"
        app
      >
        <v-list dense>
          <v-list-item
            v-for="navItem in navItems"
            :key="navItem.id"
            :to="navItem.route"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ navItem.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ navItem.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar
        app
        dark
        class="primary"
        elevate-on-scroll
        fixed
      >
        <v-app-bar-nav-icon
          class="d-sm-flex d-md-none"
          @click.stop="drawer = !drawer"
        >
        </v-app-bar-nav-icon>
        <img class="mr-3" :src="require('../assets/logo.png')" height="40" >
        <v-toolbar-title
          style="cursor: pointer" 
          @click="$router.push('/')"
        >{{ navTitle }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <span 
          v-for="navItem in navItems" 
          :key="navItem.id"
          class="d-none d-md-flex"
          >
          <v-btn 
            text
            :to="navItem.route"
          >
            {{ navItem.name }}
          </v-btn>
        </span>
      </v-app-bar>
    </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: null,
      navItems: [
        { id: 1, name: 'Home', icon: 'mdi-home', route: '/'},
        { id: 2, name: 'About', icon: 'mdi-information', route: '/about'},
        { id: 3, name: 'Podcast', icon: 'mdi-microphone', route: '/podcast/'},
        { id: 4, name: 'Crypto', icon: 'mdi-bitcoin', route: '/crypto'},
      ],
      navTitle: 'The Crypto Masters'
    }
  }

}
</script>

<style>

</style>