<template>
  <v-card
    class="mx-auto mt-4"
    max-width="800"
  >
    <v-row
      justify="center"
    > 
      <v-card-title
        class="mt-8 mx-8
                text-xl-h5 text-lg-h5 text-md-h5 text-sm-h5 subtitle-1"
      >
        <p>
          <strong>{{ baseCoinSymbol }} </strong> 
          {{ titleVerbiage }}
          <strong>{{ multipleCoinSymbol }}</strong>
        </p>
      </v-card-title>
    </v-row>
    <v-row
      v-if="isBaseStableCoin"
      justify="center"
      align="center"
    >
      <v-alert
        class="overflow-x-auto"
        outlined
        type="warning"
        
        border="left"
      >
          <strong>{{ baseCoinName }}</strong> is stable coin.
      </v-alert>
    </v-row>
    <v-row 
      align="center"
      justify="center"
    >
      <v-card-text
        align="center"
        justify="center"
        class="pa-0 mb-8 mx-8 font-weight-bold
            text-xl-h5 text-lg-h5 text-md-h5 text-sm-h5 subtitle-1"
      >
        <p 
          class="justify-center"
          style="align-items: center; display: flex;"
        >
          <img 
            :src="baseCoinImage" 
            :alt="baseCoinName"
            height="38"
            class="pr-2"
            name="marketCapCalculate"
          >
          {{ this.priceAtNewMarketCap }} 
          <span
            :class="(marketCapMultiple) >= 1 ? 'success--text' : 'error--text'"
          >
            (x{{ this.formatValue(marketCapMultiple) }})
          </span>
        </p>
      </v-card-text>
    </v-row>
    
  </v-card>
</template>

<script>
export default {
    data: () => ({ 
      titleVerbiage: ' with the market cap of ',
    }),
    props: {
      baseCoinName: String,
      baseCoinSymbol: String,
      priceAtNewMarketCap: String,
      marketCapMultiple: Number,
      baseCoinImage: String,
      isBaseStableCoin: Boolean,
      // baseCoinMarketCap: Number,
      // baseCoinCurrentPrice: Number,
      multipleCoinSymbol: String,
    },
    created(){},
    methods: {
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