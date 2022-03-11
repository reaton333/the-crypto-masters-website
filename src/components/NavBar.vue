<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      bottom
      dark
      class="primary"
      app
      name="hamburgerMenu"
    >
      <v-list dense>
        <v-list-item
          v-for="navItem in allNavItems"
          :key="navItem.id"
          :to="navItem.route"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ navItem.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              class="font-weight-bold"
            >
              {{ navItem.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      dark
      class="primary font-weight-bold"
      elevate-on-scroll
      fixed
    >
      <v-app-bar-nav-icon
        class="d-sm-flex d-md-none"
        @click.stop="drawer = !drawer"
      >
      </v-app-bar-nav-icon>
      <img 
        class="mr-3" 
        :src="require('../assets/tcmLogo_capNoBg.png')" 
        alt="The Crypto Masters Logo"
        height="40" >
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
          name="navigationItem"
        >
          {{ navItem.name }}
        </v-btn>
      </span>
      <v-menu 
        bottom offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            class="cryptoAppBarItem"
            color="primary"
            dark
            v-on="on"
            elevation="0"
            name="navigationItem"
          >
            Crypto Tools
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="item in cryptoNavItems"
            :key="item.id"
            v-model="item.active"
            no-action
            :to="item.route"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-content>
          </v-list-item>
        </v-list>
      </v-menu>
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
        { id: 4, name: 'Blog', icon: 'mdi-newspaper', route: '/blog/'},
      ],
      cryptoNavItems: [
        { id: 5, name: 'Crypto Prices', icon: 'mdi-bitcoin', route: '/crypto'},
        { id: 6, name: 'Hindsight Tool', icon: 'mdi-school', route: '/profitCalculator'},
        { id: 7, name: 'Price at Market Cap', icon: 'mdi-cash-multiple', route: '/priceAtMarketCap'},
      ],
      allNavItems: [],
      navTitle: 'THE CRYPTO MASTERS'
    }
  },
  created() {
    this.allNavItems = [...this.navItems, ...this.cryptoNavItems];
  }

}
</script>

<style>

@media screen and (max-width: 959px) {
  .cryptoAppBarItem {
    display: none !important;
  }
}


</style>