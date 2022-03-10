<template>
    <v-row
        align="center"
    >
        <v-col
            v-for="(tool, idx) in Tools"
            :key="idx"
        >
            <v-card
                class="mx-auto"
                max-width="344"
                height="380"
            >
                <v-img
                    contain
                    max-height="400px"
                    :src="tool.image"
                    height="200px"
                ></v-img>

                <v-card-title>
                    {{ tool.name }}
                </v-card-title>

                <v-card-subtitle>
                    {{ tool.description }}
                </v-card-subtitle>

                <v-card-actions>
                    <v-btn
                        @click="goToTool(tool.urlName)"
                        color="secondary"
                        text
                        class="font-weight-bold"
                    >
                        USE TOOL
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data() {
        return {
            Tools: [
                { 
                    name: 'Crypto Prices', 
                    description: 'Prices, details, and charts on your favorite crypto assets. Select from over 10k coins!', 
                    image: require('../assets/coin_prices_charts.png'), 
                    urlName: 'CoinList'
                },
                { 
                    name: 'Professor Hindsight', 
                    description: 'Show the potential of investing in a particular coin for a given investment amount', 
                    image: require('../assets/professor_hindsight.png'), 
                    urlName: 'CryptoPredictor'
                },
                { 
                    name: 'Price at Market Cap', 
                    description: 'See the price of a coin if it had the market cap of another. Good for comparing coins in similar markets!', 
                    image: require('../assets/priceAtMarketCap.png'), 
                    urlName: 'PriceAtMarketCap'
                },
            ],
        }
    },
    methods: {
        goToTool(urlName){
            // console.log(blogId)
            this.$router.push({ 
                name: urlName,
            })
        },
    }
}
</script>

<style>

</style>