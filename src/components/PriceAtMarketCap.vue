<template>
  <v-card
        class="mx-auto mt-8 pa-3"
        max-width="1000"
    >
        <v-form 
            v-model="valid"
            ref="form"
        >
            <v-container>  
            <v-row
                justify="center"
            >
                <v-card-title 
                    class="pa-0 mb-8
                        font-weight-bold
                        text-xl-h4 text-lg-h4 text-md-h4 text-sm-h4 h5"
                >
                    Price at Market Cap
                </v-card-title>
            </v-row>
            <v-row align="center" class="pl-2 mx-8">
              <v-select
                v-model="calculationMethod"
                :items="calulationMethods"
                label="Calculation Method"
                outlined
              ></v-select> 
            </v-row>
            <v-row
              v-if="calculationMethod"
              class="mx-8"
            >
              <v-autocomplete
                  v-model="baseCoin"
                  :items="allCoins"
                  clearable
                  :filter="filterCoinAndSymbol"
                  item-text="name"
                  item-value="id"
                  :loading="listLoading"
                  no-data-text="No coins to display"
                  prepend-icon="mdi-bitcoin"
                  auto-select-first
                  dense
                  label="Select Coin"
                  :rules="coinIdRules"
              >
                  <template 
                      v-slot:item="data"
                  >
                      <v-list-item-content>
                          <v-list-item-title>
                              #{{ data.item.market_cap_rank }} &nbsp; {{ data.item.name }}
                          </v-list-item-title>
                          <v-list-item-subtitle v-text="data.item.symbol"></v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-avatar>
                          <v-img 
                              :src="data.item.thumb"
                              max-height="22"
                              max-width="22"
                          >
                          </v-img>
                      </v-list-item-avatar>
                  </template>
              </v-autocomplete>
            </v-row>
            <v-row
              v-if="calculationMethod"
              class="mx-8"
              justify="center"
            >
              <p
                class="pa-0 mb-0
                      text-xl-h5 text-lg-h5 text-md-h5 text-sm-h5 subtitle-1"
              > with market cap of </p>
            </v-row>
            <v-row
              v-if="calculationMethod == 'Coin Comparison'"
              class="mx-8 pb-8"
            >
              <v-autocomplete
                  v-model="multipleCoin"
                  :items="allCoins"
                  clearable
                  :filter="filterCoinAndSymbol"
                  item-text="name"
                  item-value="id"
                  :loading="listLoading"
                  no-data-text="No coins to display"
                  prepend-icon="mdi-bitcoin"
                  auto-select-first
                  dense
                  label="Select Coin"
                  :rules="coinIdRules"
              >
                  <template 
                      v-slot:item="data"
                  >
                      <v-list-item-content>
                          <v-list-item-title>
                              #{{ data.item.market_cap_rank }} &nbsp; {{ data.item.name }}
                          </v-list-item-title>
                          <v-list-item-subtitle v-text="data.item.symbol"></v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-avatar>
                          <v-img 
                              :src="data.item.thumb"
                              max-height="22"
                              max-width="22"
                          >
                          </v-img>
                      </v-list-item-avatar>
                  </template>
              </v-autocomplete>
            </v-row>
            <v-row 
              v-if="calculationMethod == 'Market Cap Price'"
              class="mx-8 pb-8"
            >
              <v-text-field
                  v-model="marketCapValue"
                  ref="marketCapValue"
                  label="Market Cap Value"
                  :rules="investedRules"
                  pattern="\d*"
                  prepend-icon="mdi-currency-usd"
              ></v-text-field>
            </v-row>
            <v-btn
                v-if="calculationMethod"
                color="secondary"
                class="text-left black--text
                text-xl-body-1 text-lg-body-1 text-md-body-1 text-sm-body-2 text-xs-body-2"
                dark
                @click="validate"
            >
                <v-icon
                    left
                    light
                >
                    mdi-calculator
                </v-icon>
                    Calculate
            </v-btn>
            </v-container>
        </v-form>
        <v-row v-if="priceAtMarketCapErrorMessage">
            <v-card-subtitle 
                class="red--text font-weight-bold
                text-xl-subtitle-2 text-lg-subtitle-2 text-md-subtitle-2 text-sm-body-1 text-xs-body-1"
            >
                {{ priceAtMarketCapErrorMessage }}
            </v-card-subtitle>
        </v-row>
        <div 
            class="text-center"
            v-if="loadingCalculation"
        >
            <v-progress-circular
            indeterminate
            color="primary"
            >
            </v-progress-circular>
        </div>
        <div v-if="priceAtNewMarketCap !== ''">
            <v-card-title>
                <v-row align="start">
                    <div class="text-caption grey--text text-uppercase">
                        Total Profit
                    </div>
                    <div>
                    <span 
                        class="font-weight-bold" 
                        :class="(newAmount - amountInvested) >= 0 ? 'success--text' : 'error--text'">
                        {{ this.totalProfit }}
                    </span>
                    </div>
                </v-row>
            </v-card-title>
            <v-card-subtitle 
                class="black--text font-weight-bold
                text-xl-h6 text-lg-h6 text-md-h6 text-sm-subtitle-1 text-xs-subtitle-1"
            >
                Investment Details
            </v-card-subtitle>
            <v-row>
                <v-col
                    cols="10"
                    md="4"
                >
                    <v-card-subtitle 
                        class="black--text
                        text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1 text-sm-subtitle-2 text-xs-subtitle-2"
                    >
                        <p class="mb-0 font-weight-bold">
                            Starting Price
                        </p> 
                            {{ this.formatPrice(priceAtStart) }}
                    </v-card-subtitle>
                </v-col>
                <v-col
                    cols="10"
                    md="4"
                >
                    <v-card-subtitle 
                        class="black--text 
                        text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1 text-sm-subtitle-2 text-xs-subtitle-2"
                    >
                        <p class="mb-0 font-weight-bold">
                            Ending Price
                        </p>
                        {{ this.formatPrice(priceAtEnd) }}
                    </v-card-subtitle>
                </v-col>
                <v-col
                    cols="10"
                    md="4"
                >
                    <v-card-subtitle 
                        class="black--text
                        text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1 text-sm-subtitle-2 text-xs-subtitle-2"
                    >
                        <p class="mb-0 font-weight-bold">
                            New Amount
                        </p>
                        {{ this.formatPrice(newAmount) }}
                    </v-card-subtitle>
                </v-col>
            </v-row>
        </div>
    </v-card>
</template>

<script>
import axios from 'axios';
// import { validationMixin } from 'vuelidate'
// import { required } from 'vuelidate/lib/validators'

export default {
  props: {
    detailsPageMetaInfo: {},
  },
  metaInfo() {
    return {
      title: this.priceAtMarketCapMetaInfo.title,
      description: this.priceAtMarketCapMetaInfo.description,
      meta: [
          { property: 'og:type', content: 'website' },
          { property: 'og:url', content: this.priceAtMarketCapMetaInfo.url },
          { property: 'og:title', content: this.priceAtMarketCapMetaInfo.title },
          { property: 'og:description', content: this.priceAtMarketCapMetaInfo.description },
          { property: 'og:image', content: this.priceAtMarketCapMetaInfo.image },

          { property: 'twitter:card', content: 'summary_large_image' },
          { property: 'twitter:url', content: this.priceAtMarketCapMetaInfo.url },
          { property: 'twitter:title', content: this.priceAtMarketCapMetaInfo.title },
          { property: 'twitter:description', content: this.priceAtMarketCapMetaInfo.description },
          { property: 'twitter:image', content: this.priceAtMarketCapMetaInfo.image  },
      ]
    }
  },
  data () {
    return {
      allCoins: [],
      calculationMethod: '',
      baseCoin: '',
      multipleCoin: '',
      marketCapValue: null,
      calulationMethods: ['Market Cap Price', 'Coin Comparison'],
      coinDetails: '',
      coinName: '',
      coinImage: '',
      coinSymbol: '',
      currentPrice: '',
      marketCapRank: '',
      marketCap: '',
      priceAtNewMarketCap: '',
      priceAtMarketCapMetaInfo: {
          title: 'Price at Market',
          description: 'What price a coin would be at a given market cap',
          image: require('../assets/priceAtMarketCap.png'),
          url: `${this.$router.currentRoute.path}`,
      },
    }
  },
  created() {
    if (this.detailsPageMetaInfo) {
      this.hindsightPageMetaInfo = this.detailsPageMetaInfo
    }
  },
  mounted() {

    this.allCoins = this.$session.get('allCoins')

    if(this.coinId) {
      this.myCoinId = this.coinId
    }
    if (!this.allCoins) {
      this.listLoading = 'primary'
      this.getAllCoins()
    } else {
      this.listLoading = false;
    }
  },
  methods: {
    async getAllCoins() {

      try {
        const baseURL = `https://api.coingecko.com/api/v3/search`
        const params = `?local=en`
        const fullPath = baseURL + params
        // console.log(fullPath)
        const res = await axios.get(fullPath)

        this.allCoins = res.data.coins;
        // console.log(this.allCoins)
        this.$session.set("allCoins", this.allCoins);
        this.$session.set("totalCoins", this.allCoins.length);
        this.listLoading = false
      } catch (e) {
        console.log(e);
      }
    },
    async calcPriceAtMarketCap() {
      this.loading = true
      // base marketCap * multiple marketCap

      this.loading = false
    },
    async getCoinData(coinId) {

        const baseURL = `https://api.coingecko.com/api/v3/coins/`
        var apiParams = `?tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`

        try {
            const res = await axios.get(baseURL + coinId + apiParams)

            this.coinDetails = res.data;
            this.coinName = this.coinDetails.name
            this.coinImage = this.coinDetails.image.large
            this.coinSymbol = this.coinDetails.symbol.toUpperCase()
            this.currentPrice = this.formatPrice(this.coinDetails.market_data.current_price.usd)
            this.marketCapRank = this.coinDetails.market_cap_rank
            this.marketCap = this.coinDetails.market_data.market_cap.usd
            // console.log(this.coinDetails.market_data.current_price.usd)

            // this.createChart(this.fromDateRange, this.toDateRange);
            this.createChart('firstLoad');

            this.loading = false

        } catch (e) {
            if(e.response.status === 404) {
                // console.log('ahhhhhhhhhhh')
                this.$router.push('/NotFound')
            }
            console.log(e.response.status);

            this.loading = false
        }
        this.loading = false
    },
    formatPrice(value) {
      let formatOptions = {
          style: 'currency',
          currency: 'USD',
          // These options are needed to round to whole numbers if that's what you want.
          //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
          //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      }

      if (value < 0.01) {
          formatOptions.minimumSignificantDigits = 2
          formatOptions.maximumSignificantDigits = 2
      }

      // Create our number formatter
      var formatter = new Intl.NumberFormat('en-US', formatOptions);

      return formatter.format(value)
    },
  }
}
</script>

<style>

</style>