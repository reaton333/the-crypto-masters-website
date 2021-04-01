<template>
  <v-container 
    class="pa-0"
  >
      <v-row
          no-gutters
          class="pa-0"
        >
          <v-col

          >
          </v-col>
          <v-col

          >
          </v-col>
          <v-col

          >
            <v-autocomplete
              v-model="allCoins"
              :items="allCoins"
              item-text="name"
              item-value="id"
              no-data-text="No coins to display"
              auto-select-first
              dense
              solo
              filled
              label="Search"
              @input="goToCoinDescription"
            >
              <template 
                v-slot:item="data"
              >
                  <v-list-item-avatar>
                    <v-img 
                      :src="data.item.thumb"
                      max-height="22"
                      max-width="22"
                    >
                    </v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      class=""
                    >
                      {{ data.item.name }} - {{ data.item.symbol }}
                    </v-list-item-title>
                    
                  </v-list-item-content>
              </template>

              <!-- <v-list-item-subtitle>
                      #{{ data.item.market_cap_rank }}
                    </v-list-item-subtitle> -->
            </v-autocomplete>
          </v-col>
      </v-row>
    <!-- </v-container> -->
    <v-container v-if="loading" style="height: 300px;">
      <v-row
        class="fill-height"
        align-content="center"
        justify="center"
      >
        <v-col
          class="subtitle-1 text-center"
          cols="12"
        >
          Loading Coins
        </v-col>
        <v-col cols="6">
          <v-progress-linear
            color="secondary"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
    <v-data-table
      v-else
      :headers="headers"
      :items="coins"
      :items-per-page="pageSize"
      :mobile-breakpoint="0"
      style="min-width:450px"
      :dense="isMobile"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:item.name="{ item }">
        <v-row v-if="!isMobile">
          <v-img 
            class="coinLogo" 
            :src="item.image" 
            :alt="item.name"
            contain
            max-width="30"
            max-height="30"
          >
          </v-img>
          <v-btn 
            plain
            text
            @click="goToCoinDescription(item.id)"
          >
            {{ item.name }} - {{ item.symbol.toUpperCase() }}
          </v-btn>
        </v-row>
        <v-row v-else
          no-gutters
        >
          <v-img 
            class="coinLogo" 
            v-bind:src="item.image" 
            v-bind:alt="item.name"
            contain
            max-width="18"
            max-height="18"
          >
          </v-img>
          <v-btn 
            plain
            text
            x-small
            @click="goToCoinDescription(item.id)"
          >
            {{ item.symbol.toUpperCase() }}
          </v-btn>
        </v-row>
      </template>
      <template v-slot:item.current_price="{ item }">
        <span>{{ formatPrice(item.current_price) }}</span>
      </template>
      <template v-slot:item.price_change_percentage_24h_in_currency="{ item }">
        <span :class="item.price_change_percentage_24h_in_currency >= 0 ? 'success--text' : 'error--text'">
          {{ formatPercentGain(item.price_change_percentage_24h_in_currency) }}
        </span>
      </template>
      <template v-slot:item.price_change_percentage_7d_in_currency="{ item }">
        <span :class="item.price_change_percentage_7d_in_currency >= 0 ? 'success--text' : 'error--text'">
          {{ formatPercentGain(item.price_change_percentage_7d_in_currency) }}
        </span>
      </template>
      <template v-slot:item.price_change_percentage_30d_in_currency="{ item }">
        <span :class="item.price_change_percentage_30d_in_currency >= 0 ? 'success--text' : 'error--text'">
          {{ formatPercentGain(item.price_change_percentage_30d_in_currency) }}
        </span>
      </template>
      <!-- <template v-slot:item.price_change_percentage_1y_in_currency="{ item }">
        <span :class="item.price_change_percentage_1y_in_currency >= 0 ? 'success--text' : 'error--text'">
          {{ formatPercentGain(item.price_change_percentage_1y_in_currency) }}
        </span>
      </template> -->
      <template v-slot:item.market_cap="{ item }">
        <span>{{ formatMarketCap(item.market_cap) }}</span>
      </template>
    </v-data-table>
    <v-pagination
      v-model="page"
      total-visible="8"
      :length="Math.floor(totalCoins/pageSize)+1"
      @input="getCoinsList"
    ></v-pagination>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
        isMobile: false,
        window: {
          width: 0,
          height: 0
        },
        headers: 
        [
          { index: 0, type: 'detail', text: '#', align: 'start', sortable: false, value: 'market_cap_rank' },
          { index: 1, type: 'detail', text: 'Coin', align: 'start', value: 'name' },
          { index: 2, type: 'detail', text: 'Price', align: 'end', value: 'current_price' },
          { index: 3, type: 'change', text: '24h', align: 'end', value: 'price_change_percentage_24h_in_currency' },
          { index: 4, type: 'change', text: '7d', align: 'end', value: 'price_change_percentage_7d_in_currency' },
          { index: 5, type: 'change', text: '30d', align: 'end', value: 'price_change_percentage_30d_in_currency' },
          // { index: 6, type: 'change', text: '1y', align: 'end', value: 'price_change_percentage_1y_in_currency' },
          { index: 7, type: 'detail', text: 'Market Cap', align: 'end', value: 'market_cap' },
        ],
        // Storing the headers I remove here so I can add them back later
        // This is for mobile resizing
        removedHeaders: [], 
        coins: [],
        allCoins: [],
        searchableCoinList: [],
        loading: true,
        currentSort: 'market_cap',
        sortDesc: true,
        pageSize: 100,
        totalCoins: 0,
        currency: 'usd',
        tableResize: 777
    }
  },
  created() {

    window.addEventListener('resize', this.handleResize);
    this.handleResize();

    this.page = 1;
    this.getAllCoins();
    this.getCoinsList(this.page);
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    async handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;

      if (this.window.width < this.tableResize && !this.isMobile) {
        this.isMobile = true;
        this.reformatCoinTable();
      } else if (this.window.width >= this.tableResize && this.isMobile) {
        this.isMobile = false;
        this.reformatCoinTable();
      }
    },
    async getCoinsList(myPage) {

      this.loading = true;

      try {
          const baseURL = `https://api.coingecko.com/api/v3/coins/markets`
          const params = `?vs_currency=${this.currency}&order=market_cap_desc&per_page=${this.pageSize}&page=${myPage}&sparkline=false&price_change_percentage=24h%2C7d%2C30d`
          const fullPath = baseURL + params
          // console.log(fullPath)
          const res = await axios.get(fullPath)

          this.coins = res.data;
          this.loading = false;
          // this.sortedCoinList = this.sortedCoins();
      } catch (e) {
          console.log(e);
      }
    },
    async getAllCoins() {

      try {
          const baseURL = `https://api.coingecko.com/api/v3/search`
          const params = `?local=en`
          const fullPath = baseURL + params
          // console.log(fullPath)
          const res = await axios.get(fullPath)

          this.allCoins = res.data.coins;
          this.totalCoins = this.allCoins.length;
      } catch (e) {
          console.log(e);
      }

    },
    async reformatCoinTable() {

      if (this.isMobile) {

        // Store removed items in removedHeaders array
        this.removedHeaders = this.headers.filter(function( obj ) {
          return obj.type === 'change';
        });
        this.headers = this.headers.filter(function( obj ) {
          return obj.type !== 'change';
        });

      } else { 

        // add change items to headers list
        var tempHeaders = this.headers;
        tempHeaders = tempHeaders.concat(this.removedHeaders);
        this.removedHeaders = [];

        // reorder list by id
        tempHeaders.sort((a, b) => (a.index > b.index) ? 1 : -1)

        // overwrite headers list
        this.headers = tempHeaders;
      }
    },
    itemSelectedMethod(coinIdSelected) {
      console.log('You selected an item!')
    },
    goToCoinDescription(coinId){
      console.log('ENTER coinDescription for: ' + coinId)
      this.$router.push({ 
        name: 'Coin',
        params: {
          coinId: coinId
        }
      })
    },
    formatPrice(value) {
      // Create our number formatter.
    
      if (value < 10) {
        var formatter = new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 3,
          style: 'currency',
          currency: this.currency,
        });
      } else {
        var formatter = new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 2,
          style: 'currency',
          currency: this.currency,
        });
      }

      return formatter.format(value)
    },
    formatPercent(value) {
      // Create our number formatter.
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: this.currency,
      });

      return formatter.format(value)
    },
    formatMarketCap(value) {
      // Create our number formatter.
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: this.currency,
        minimumFractionDigits: 0
      });

      return formatter.format(value)
    },
    formatPercentGain(value) {

      let formattedNum = parseFloat(value).toFixed(2);

      if(isNaN(formattedNum)) {
        return this.formatPrice(0.0).replace('$', '')+'%'
      } else {
        return this.formatPrice(formattedNum).replace('$', '')+'%'
      }
    }
  },
  watch: {
  }, 
  computed: {
  }
}
</script>

<style>

.coinLogo {
    transition: all 0.3s ease-in-out 0s;
}

.coinLogo:hover {
  cursor: default;
  -webkit-transform-origin: 50% 50%;
  -moz-transform-origin: 50% 50%;
  -o-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  transform: rotate(360deg);
  transition: all 0.3s ease-in-out 0s;
}
</style>