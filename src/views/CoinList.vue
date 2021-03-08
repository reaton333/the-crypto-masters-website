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
            color="yellow darken-2"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
    <v-simple-table
      v-else
      fixed-header
    >
      <template v-slot:default>
        <thead>   
          <tr class="tableHeader">
              <th class="text-left">#</th>
              <th class="text-left">Coin</th>
              <th class="text-right">Price</th>
              <th class='text-right filter' @click="sortCoins('price_change_percentage_7d_in_currency')">
                7d
                <span v-if="currentSort !== 'price_change_percentage_7d_in_currency'">
                  <i class="fas fa-sort"></i>
                </span>
                <span v-else-if="currentSort === 'price_change_percentage_7d_in_currency' && !sortDesc">
                  <i class="fas fa-sort-up"></i>
                </span>
                <span v-else-if="currentSort === 'price_change_percentage_7d_in_currency' && sortDesc">
                  <i class="fas fa-sort-down"></i>
                </span>
              </th>
              <th class='text-right filter' @click="sortCoins('price_change_percentage_30d_in_currency')">
                30d
                <span v-if="currentSort !== 'price_change_percentage_30d_in_currency'">
                  <i class="fas fa-sort"></i>
                </span>
                <span v-else-if="currentSort === 'price_change_percentage_30d_in_currency' && !sortDesc">
                  <i class="fas fa-sort-up"></i>
                </span>
                <span v-else-if="currentSort === 'price_change_percentage_30d_in_currency' && sortDesc">
                  <i class="fas fa-sort-down"></i>
                </span>
              </th>
              <th class='text-right filter' @click="sortCoins('price_change_percentage_1y_in_currency')">
                1y
                <span v-if="currentSort !== 'price_change_percentage_1y_in_currency'">
                  <i class="fas fa-sort"></i>
                </span>
                <span v-else-if="currentSort === 'price_change_percentage_1y_in_currency' && !sortDesc">
                  <i class="fas fa-sort-up"></i>
                </span>
                <span v-else-if="currentSort === 'price_change_percentage_1y_in_currency' && sortDesc">
                  <i class="fas fa-sort-down"></i>
                </span>
              </th>
              <th class='text-right filter' @click="sortCoins('market_cap')">
                Market Cap
                <span v-if="currentSort !== 'market_cap'">
                  <i class="fas fa-sort"></i>
                </span>
                <span v-else-if="currentSort === 'market_cap' && !sortDesc">
                  <i class="fas fa-sort-up"></i>
                </span>
                <span v-else-if="currentSort === 'market_cap' && sortDesc">
                  <i class="fas fa-sort-down"></i>
                </span>
              </th>  
          </tr>
        </thead>
        <tbody>
          <tr v-for="coin in coins" :key="coin.market_cap_rank">
            <td>{{ coin.market_cap_rank }}</td>
            <td>
              <v-row>
                <v-img 
                  class="coinLogo" 
                  v-bind:src="coin.image" 
                  v-bind:alt="coin.name"
                  contain
                  max-width="30"
                  max-height="30"
                >
                </v-img>
                <v-btn 
                  plain
                  text
                  @click="goToCoinDescription(coin.id)"
                >{{ coin.name }} - {{ coin.symbol.toUpperCase() }}
                </v-btn>
              </v-row>
            </td>
            <td class="text-right">{{ formatPrice(coin.current_price) }}</td>
            <td class="text-right" :class="coin.price_change_percentage_7d_in_currency >= 0 ? 'gain' : 'lose'">{{ formatPercentGain(coin.price_change_percentage_7d_in_currency) }}</td>
            <td class="text-right" :class="coin.price_change_percentage_30d_in_currency >= 0 ? 'gain' : 'lose'">{{ formatPercentGain(coin.price_change_percentage_30d_in_currency) }}</td>
            <td class="text-right" :class="coin.price_change_percentage_1y_in_currency >= 0 ? 'gain' : 'lose'">{{ formatPercentGain(coin.price_change_percentage_1y_in_currency) }}</td>
            <td class="text-right">{{ formatMarketCap(coin.market_cap) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
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
          coins: [],
          allCoins: [],
          loading: true,
          positiveGain: false,
          currentSort: 'market_cap',
          sortDesc: true,
          pageSize: 100,
          totalCoins: 0,
          currency: 'usd',
      }
  },
  props: [

  ],
  created() {

    // this.page = parseInt(this.$route.params.pageNumber);
    this.page = 1;
    // console.log(this.page);
    this.getAllCoins();
    this.getCoinsList(this.page);
    // console.log(this.sortedCoins);
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
    sortCoins(sortOrder) {
      
      if (this.currentSort === sortOrder) {
        // toggle
        // console.log('Same sort, tobble')
        this.sortDesc = !this.sortDesc;
        this.sortByColName(this.currentSort);

      } else {
        // new sort make sure it's desc
        // console.log('New sort, desc')
        this.currentSort = sortOrder;
        this.sortDesc = true;
        this.sortByColName(this.currentSort);
      }
    },
    sortByColName(colName) {
      ///////////////////////////////////////
      //////////////// DESC /////////////////
      ///////////////////////////////////////

      if (this.sortDesc) {
        if (colName == 'price_change_percentage_7d_in_currency') {

          this.coins.sort(
            (a, b) => (a.price_change_percentage_7d_in_currency > b.price_change_percentage_7d_in_currency) 
                ? -1 : 1
          )
        } else if (colName === 'price_change_percentage_30d_in_currency') {
          // desc sort
          this.coins.sort(
            (a, b) => (a.price_change_percentage_30d_in_currency > b.price_change_percentage_30d_in_currency) 
                ? -1 : 1
          )
        } else if (colName === 'price_change_percentage_1y_in_currency') {
          // desc sort
          this.coins.sort(
            (a, b) => (a.price_change_percentage_1y_in_currency > b.price_change_percentage_1y_in_currency) 
                ? -1 : 1
          )
        } else if (colName === 'market_cap') {
          // desc sort
          this.coins.sort(
            (a, b) => (a.market_cap > b.market_cap) 
                ? -1 : 1
          )
        } else {
          console.warn('DESC SORT ERROR!')
        }
      } else {
        ///////////////////////////////////////
        ///////////////// ASC /////////////////
        ///////////////////////////////////////
        if (colName == 'price_change_percentage_7d_in_currency') {

          this.coins.sort(
            (a, b) => (a.price_change_percentage_7d_in_currency > b.price_change_percentage_7d_in_currency) 
                ? 1 : -1
          )
        } else if (colName === 'price_change_percentage_30d_in_currency') {
          // desc sort
          this.coins.sort(
            (a, b) => (a.price_change_percentage_30d_in_currency > b.price_change_percentage_30d_in_currency) 
                ? 1 : -1
          )
        } else if (colName === 'price_change_percentage_1y_in_currency') {
          // desc sort
          this.coins.sort(
            (a, b) => (a.price_change_percentage_1y_in_currency > b.price_change_percentage_1y_in_currency) 
                ? 1 : -1
          )
        } else if (colName === 'market_cap') {
          // desc sort
          this.coins.sort(
            (a, b) => (a.market_cap > b.market_cap) 
                ? 1 : -1
          )
        } else {
          console.warn('ASC SORT ERROR!')
        }
      }
    },
    page() {

    },
    next() {

      console.log('ENTER next page....');

      this.page++;
      this.$route.params.pageNumber = this.page;
      console.log('Curr page: ' + this.page)
      console.log('Curr route param page: ' + this.$route.params.pageNumber)
      this.$router.push({ 

        path: `/page=${this.page}`
      })
    },
    previous() {

      if (this.page > 1) {
        this.page--;
        this.$route.params.pageNumber = this.page;
        
        // console.log('Curr page: ' + this.page)
        this.$router.push({ 

          path: `/page=${this.page}`
        })
      }
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
	  async $route (to, from) {
      this.page = this.$route.params.pageNumber
      // console.log('Watch: ' + this.page)
		 	this.getCoinsList(this.pageSize, this.page)
    },
  }, 
  computed: {

  }
}
</script>

<style>

:root {
  --cmMain: #fed404;
  --cmRed: #BF5748;
  --cmGreen: #00A436;
}

.gain {
  color: var(--cmGreen);
}

.lose {
  color: var(--cmRed);
}

.link {
  text-decoration: underline;
  cursor: pointer;
}

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