<template>
  <div>
    <div class="text-center">      
      <v-pagination
          v-model="page"
          total-visible="8"
          :length="Math.floor(totalCoins/pageSize)+1"
          @input="getCoinsList"
      ></v-pagination>
    </div>
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
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:item.name="{ item }">
        <v-row>
          <v-img 
            class="coinLogo" 
            v-bind:src="item.image" 
            v-bind:alt="item.name"
            contain
            max-width="30"
            max-height="30"
          >
          </v-img>
          <v-btn 
            plain
            text
            @click="goToCoinDescription(item.id)"
          >{{ item.name }} - {{ item.symbol.toUpperCase() }}
          </v-btn>
        </v-row>
      </template>
      <template v-slot:item.current_price="{ item }">
        <span>{{ formatPrice(item.current_price) }}</span>
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
      <template v-slot:item.price_change_percentage_1y_in_currency="{ item }">
        <span :class="item.price_change_percentage_1y_in_currency >= 0 ? 'success--text' : 'error--text'">
          {{ formatPercentGain(item.price_change_percentage_1y_in_currency) }}
        </span>
      </template>
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
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
        headers: 
        [
          { text: '#', align: 'start', sortable: false, value: 'market_cap_rank' },
          { text: 'Coin', align: 'start', value: 'name' },
          { text: 'Price', align: 'end', value: 'current_price' },
          { text: '7d', align: 'end', value: 'price_change_percentage_7d_in_currency' },
          { text: '30d', align: 'end', value: 'price_change_percentage_30d_in_currency' },
          { text: '1y', align: 'end', value: 'price_change_percentage_1y_in_currency' },
          { text: 'Market Cap', align: 'end', value: 'market_cap' },
        ],
        coins: [],
        allCoins: [],
        loading: true,
        currentSort: 'market_cap',
        sortDesc: true,
        pageSize: 100,
        totalCoins: 0,
        currency: 'usd'
    }
  },
  created() {

    this.page = 1;
    this.getAllCoins();
    this.getCoinsList(this.page);
  },
  methods: {
    async getCoinsList(myPage) {

      this.loading = true;

      try {
          const baseURL = `https://api.coingecko.com/api/v3/coins/markets`
          const params = `?vs_currency=${this.currency}&order=market_cap_desc&per_page=${this.pageSize}&page=${myPage}&sparkline=false&price_change_percentage=7d%2C30d%2C1y`
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
          const baseURL = `https://api.coingecko.com/api/v3/coins/list`
          const params = ``
          const fullPath = baseURL + params
          // console.log(fullPath)
          const res = await axios.get(fullPath)

          this.allCoins = res.data;
          this.totalCoins = this.allCoins.length;
          // this.sortedCoinList = this.sortedCoins();
      } catch (e) {
          console.log(e);
      }
    },
    goToCoinDescription(coinId){
      // console.log(coinId)
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