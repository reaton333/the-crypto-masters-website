<template>
  <v-container>
     <v-card
      class="mx-auto my-6 pa-3"
      :max-width="maxWidth"
     >
      <v-form 
          v-model="valid"
          ref="form"
      >  
        <v-row
            justify="center"
        >
            <v-img src="../../src/assets/priceAtMarketCap.png" max-width="250" class="shrink ml-3"></v-img>
        </v-row>
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
        <v-row
          class="mx-8"
          justify="center"
        >
          <v-autocomplete
              style="max-width: 400px;"
              v-model="baseCoin"
              ref="baseCoin"
              :items="allCoins"
              solo
              clearable
              :filter="filterCoinAndSymbol"
              item-text="name"
              item-value="id"
              :loading="listLoading"
              no-data-text="No coins to display"
              auto-select-first
              label="Select Coin"
              :rules="marketCapMultipleCoinRules"
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
          class="mx-8"
          justify="center"
        >
          <p
            class="pa-0 mb-6
                  text-xl-h5 text-lg-h5 text-md-h5 text-sm-h5 subtitle-1"
          > with market cap of </p>
        </v-row>
        <v-row
          class="mx-8"
          justify="center"
        >
          <v-autocomplete
              style="max-width: 400px;"
              v-model="marketCapMultipleCoin"
              ref="marketCapMultipleCoin"
              :items="allCoins"
              :filter="filterCoinAndSymbol"
              clearable
              item-text="name"
              item-value="id"
              :loading="listLoading"
              no-data-text="No coins to display"
              auto-select-first
              solo
              inverted
              label="Select Coin"
              :rules="marketCapMultipleCoinRules"
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
        <v-row>
          <v-btn
              color="secondary"
              class="mx-8 mb-6 text-left black--text 
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
        </v-row>
      </v-form>
      <v-row 
          v-if="priceAtMarketCapErrorMessage !== ''"
          align="center"
          justify="center"
        >
          <p
            class="red--text font-weight-bold mx-8 pt-8
                text-xl-subtitle-2 text-lg-subtitle-2 text-md-subtitle-2 text-sm-body-1 text-xs-body-1"
          >
            {{ priceAtMarketCapErrorMessage }}
          </p>
        </v-row>
        <v-row
          v-if="loadingCalculation"
          class="ma-8"
          align="center"
          justify="center"
        >
          <v-progress-circular
            class="text-center"
            indeterminate
            color="primary"
          >
          </v-progress-circular>
        </v-row>
        
    </v-card>
    <!-- <div
      v-if="priceAtNewMarketCap !== ''"
    >  
    <v-card
      align="center"
      justify="center"
      class="mx-auto my-4 pa-3"
      :max-width="maxWidth"
    >
      <v-row
        justify="center"
      >
        <v-card-title>
          <img 
            :src="baseCoinImage" 
            :alt="baseCoinName"
            height="44"
            width="44"
          >
          <span class="text-xl-h5 text-lg-h5 text-md-h5 ml-1 text-sm-h5 subtitle-1 font-weight-bold">{{this.baseCoinName}} Target Price </span>
        </v-card-title>
      </v-row>
      <v-card-text 
        class="pa-0 mx-8 font-weight-bold
        text-xl-h5 text-lg-h5 text-md-h5 text-sm-h5 subtitle-1"
      >
          {{ this.priceAtNewMarketCap }} 
        <span
          class="font-weight-bold" 
          :class="(marketCapMultiple) >= 1 ? 'success--text' : 'error--text'">
          (x{{ this.formatValue(marketCapMultiple) }}) 
        </span>
      </v-card-text>
    </v-card>
      <v-row
        :max-width="maxWidth"
      >
        <v-col
          
        >
          <v-card>
            <v-img
              :src="baseCoinImage" 
              :alt="baseCoinName"
              height="44"
              width="44"
            >
              <v-card-title>{{this.baseCoinName}} Current Price</v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
</div>   -->

  <CoinMarketCapCalc 
    v-if="priceAtNewMarketCap !== ''"
    :baseCoinName="baseCoinName"
    :baseCoinSymbol="baseCoinSymbol" 
    :baseCoinImage="baseCoinImage"
    :isBaseStableCoin="isBaseStableCoin"
    :priceAtNewMarketCap="priceAtNewMarketCap"
    :marketCapMultiple="marketCapMultiple"
    :multipleCoinSymbol="multipleCoinSymbol"
  /> 

</v-container>
<!--         

        <div >
            <v-row
              
            >
              <p
                class="pa-0 mt-8 font-weight-bold mx-8
                  text-xl-h5 text-lg-h5 text-md-h5 text-sm-h5 subtitle-1"
                style="align-items: center; display: flex;"
              > 
                <img :src="baseCoinImage" :alt="baseCoinName">
                <span class="ml-2">{{this.baseCoinName}} New Price </span>
              </p>
            </v-row>
            <v-row 
              align="center"
              justify="center"
            >
                <p 
                    class="pa-0 mb-8 mx-8
                    text-xl-h5 text-lg-h5 text-md-h5 text-sm-h5 subtitle-1"
                >
                    {{ this.priceAtNewMarketCap }} 
                    <span
                      class="font-weight-bold" 
                      :class="(marketCapMultiple) >= 1 ? 'success--text' : 'error--text'">
                    (x{{ this.formatValue(marketCapMultiple) }}) </span>
                </p>
            </v-row>
            <v-row>
              <v-divider
                class="mx-8"
                inset
              ></v-divider>
            </v-row>
            <v-row
              class="mx-2"
              justify="center"
            >
                <v-col
                    cols="10"
                    md="4"
                    align="center"
                    justify="center"
                >
                    <v-card-subtitle 
                        class="black--text
                        text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1 text-sm-subtitle-2 text-xs-subtitle-2"
                    >
                        <p 
                          class="mb-0 font-weight-bold"
                          style="align-items: center; display: flex;"
                        >
                            <img 
                              :src="baseCoinImage" 
                              :alt="baseCoinName"
                              height="22"
                              width="22"
                            >
                            <span class="ml-1">{{this.baseCoinSymbol}} Current Price </span>
                        </p> 
                        {{ this.formatPrice(this.baseCoinPrice) }}
                    </v-card-subtitle>
                </v-col>
                <v-col
                    cols="10"
                    md="4"
                    align="center"
                    justify="center"
                >
                    <v-card-subtitle 
                        class="black--text 
                        text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1 text-sm-subtitle-2 text-xs-subtitle-2"
                    >
                        <p 
                          class="mb-0 font-weight-bold"
                          style="align-items: center; display: flex;"
                        >
                            <img 
                              :src="baseCoinImage" 
                              :alt="baseCoinName"
                              height="22"
                              width="22"
                            >
                            <span class="ml-1">{{this.baseCoinSymbol}} Market Cap </span>
                        </p>
                        <p>
                          {{ this.formatPrice(this.baseCoinMarketCap) }}
                        </p>
                    </v-card-subtitle>
                </v-col>
                <v-col
                    cols="10"
                    md="4"
                    align="center"
                    justify="center"
                >
                    <v-card-subtitle 
                        class="black--text
                        text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1 text-sm-subtitle-2 text-xs-subtitle-2"
                    >
                        <p 
                          class="mb-0 font-weight-bold"
                          style="align-items: center; display: flex;"
                        >
                            <img 
                              :src="baseCoinImage" 
                              :alt="baseCoinName"
                              height="22"
                              width="22"
                            >
                            <span class="ml-1"> {{this.baseCoinSymbol}} Rank</span>
                        </p>
                        #{{ this.baseCoinMarketCapRank }}
                    </v-card-subtitle>
                </v-col>
            </v-row>
            <v-row>
              <v-divider
                class="mx-8"
              ></v-divider>
            </v-row>
            
            <v-row
              class="mx-2"
            >
                <v-col
                    cols="10"
                    md="4"
                    align="center"
                    justify="center"
                >
                    <v-card-subtitle 
                        class="black--text
                        text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1 text-sm-subtitle-2 text-xs-subtitle-2"
                    >
                        <p 
                          class="mb-0 font-weight-bold"
                          style="align-items: center; display: flex;"
                        >
                            <img 
                              :src="multipleCoinImage" 
                              :alt="multipleCoinName"
                              height="22"
                              width="22"
                            >
                            <span class="ml-1">{{this.multipleCoinSymbol}} Current Price</span>
                        </p>
                        {{ this.formatPrice(this.multipleCoinPrice) }}
                    </v-card-subtitle>
                </v-col>
                <v-col
                    cols="10"
                    md="4"
                    align="center"
                    justify="center"
                >
                    <v-card-subtitle 
                        class="black--text 
                        text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1 text-sm-subtitle-2 text-xs-subtitle-2"
                    >
                        <p 
                          class="mb-0 font-weight-bold"
                          style="align-items: center; display: flex;"
                        >
                            <img 
                              :src="multipleCoinImage" 
                              :alt="multipleCoinName"
                              height="22"
                              width="22"
                            >
                            <span class="ml-1">{{this.multipleCoinSymbol}} Market Cap</span>
                        </p>
                        {{ this.formatPrice(this.multipleCoinMarketCap) }}
                    </v-card-subtitle>
                </v-col>
                <v-col
                    cols="10"
                    md="4"
                    align="center"
                    justify="center"
                >
                    <v-card-subtitle 
                        class="black--text
                        text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1 text-sm-subtitle-2 text-xs-subtitle-2"
                    >
                        <p 
                          class="mb-0 font-weight-bold"
                          style="align-items: center; display: flex;"
                        >
                            <img 
                              :src="multipleCoinImage" 
                              :alt="multipleCoinName"
                              height="22"
                              width="22"
                            >
                           <span class="ml-1">{{this.multipleCoinSymbol}} Rank</span>
                        </p>
                        <p>
                          #{{ this.multipleCoinMarketCapRank }}
                        </p>
                    </v-card-subtitle>
                </v-col>
            </v-row>
        </div>
    </v-card> 
    -->
</template>


<script>
import axios from 'axios';
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import CoinMarketCapCalc from '@/components/CoinMarketCapCalc.vue'

export default {
  mixins: [ validationMixin ],
  validations: {
    baseCoin: { required },
    marketCapMultipleCoin: { required },
    marketCapMultipleValue: { required },
  },
  components: {
    CoinMarketCapCalc,
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
      maxWidth: 800,
      listLoading: 'primary',
      baseCoin: '',
      baseCoinData: '',
      baseCoinName: '',
      baseCoinSymbol: '',
      baseCoinImage: '',
      baseCoinMarketCap: '',
      baseCoinMarketCapRank: '',
      isBaseStableCoin: false,
      multipleCoinData: '',
      multipleCoinName: '',
      multipleCoinSymbol: '',
      multipleCoinPrice: '',
      multipleCoinMarketCap: '',
      calulationMethods: ['Market Cap Price', 'Coin Comparison'],
      marketCapMultipleCoin: '',
      marketCapMultipleValue: '',
      marketCapMultiple: '',
      priceAtNewMarketCap: '',
      stableCoinWarningMessage: '',
      priceAtMarketCapErrorMessage: '',
      loadingCalculation: false,
      valid: true,
      priceAtMarketCapMetaInfo: {
          title: 'Price at Market Cap',
          description: 'What price a coin would be at a given market cap',
          image: require('../assets/priceAtMarketCap.png'),
          url: `${this.$router.currentRoute.path}`,
      },
      baseCoinRules: [
        v => !!v || 'Coin is Required',
      ],
      marketCapMultipleValueRules: [
        v => !!v || 'Value is Required',
      ],
      marketCapMultipleCoinRules: [
        v => !!v || 'Coin is Required',
      ],
    }
  },
  created() {
    this.isBaseStableCoin = false;

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
    async calcPriceAtMarketCap_inputCheck() {
      this.priceAtMarketCapErrorMessage = ''
      this.loadingCalculation = true

      // console.log(this.baseCoin);
      // console.log(this.marketCapMultipleCoin);

      // base marketCap * multiple marketCap
      if (this.baseCoin == this.marketCapMultipleCoin) {
        this.priceAtMarketCapErrorMessage = 'Coins are the same. Please select different coins!'
        this.loadingCalculation = false
      } else {
        this.calcPriceAtMarketCap()
      }
    },
    async calcPriceAtMarketCap() {

      const baseURL = `https://api.coingecko.com/api/v3/coins/`
      var apiParams = `?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`

      let fullURL_baseCoin = baseURL + this.baseCoin + apiParams
      let fullURL_multipleCoin = baseURL + this.marketCapMultipleCoin + apiParams
      // console.log(fullURL_baseCoin)
      // console.log(fullURL_multipleCoin)

      try {
        // console.log('Waiting for a response....')
        const res_base = await axios.get(fullURL_baseCoin)
        const res_MultipleCoin = await axios.get(fullURL_multipleCoin)
        // console.log('Got the response!!!')

        this.baseCoinData = res_base.data
        this.baseCoinImage = this.baseCoinData.image.small
        this.baseCoinSymbol = this.baseCoinData.symbol.toUpperCase()
        this.baseCoinMarketCapRank = this.baseCoinData.market_cap_rank
        this.isBaseStableCoin = await this.isStableCoin(this.baseCoinData.categories)
        // console.log(this.isBaseStableCoin)
        this.baseCoinName = this.baseCoinData.name
        this.baseCoinMarketCap = this.baseCoinData.market_data.market_cap.usd
        this.baseCoinPrice = this.baseCoinData.market_data.current_price.usd

        this.multipleCoinData = res_MultipleCoin.data
        this.multipleCoinImage = this.multipleCoinData.image.small
        this.multipleCoinSymbol = this.multipleCoinData.symbol.toUpperCase()
        this.multipleCoinMarketCapRank = this.multipleCoinData.market_cap_rank
        this.multipleCoinMarketCapRank = this.multipleCoinData.market_cap_rank
        this.multipleCoinPrice = this.multipleCoinData.market_data.current_price.usd
        // console.log(this.baseCoinData)
        // this.multipleCoinName = this.multipleCoinData.name
        this.multipleCoinMarketCap = this.multipleCoinData.market_data.market_cap.usd
        // this.multipleCoinPrice = this.multipleCoinData.market_data.current_price.usd

        this.marketCapMultiple = this.multipleCoinMarketCap / this.baseCoinMarketCap

        if(!this.isBaseStableCoin) {
          this.priceAtNewMarketCap = this.formatPrice(this.baseCoinPrice * this.marketCapMultiple)
        } else {
          this.priceAtNewMarketCap = this.formatPrice(this.baseCoinPrice)
        }
          
      } catch (e) {
        console.log('ERRROOOORRRR')
        if(e.response.status === 404) {
            // console.log('ahhhhhhhhhhh')
            this.$router.push('/NotFound')
        }
        console.log(e.response.status);
      }
      this.loadingCalculation = false
    },
    async validate () {
      // console.log('Validating....')
      if (this.$refs.form.validate()) {
          this.calcPriceAtMarketCap_inputCheck() 
      }
    },
    async isStableCoin(coinCategories) {
      return coinCategories.includes('Stablecoins')
    },
    filterCoinAndSymbol(item, queryText, itemText) {
      return (
        item.id.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) >
          -1 ||
        item.symbol.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1
      );
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
    formatValue(value) {
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

      return formatter.format(value).replace('$', '')
    },
  }
}
</script>

<style>

</style>