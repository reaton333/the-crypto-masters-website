<template>
  <v-autocomplete
        v-model="allCoins"
        :items="allCoins"
        :filter="filterCoinAndSymbol"
        :loading="listLoading"
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
            <v-list-item-title>
                {{ data.item.name }} - {{ data.item.symbol }}
            </v-list-item-title>
            
            </v-list-item-content>
        </template>

        <!-- <v-list-item-subtitle>
                #{{ data.item.market_cap_rank }}
            </v-list-item-subtitle> -->
    </v-autocomplete>
</template>

<script>
export default {
    name: 'CoinSearch',
    props: {
        listLoading: {
            default: 'secondary'
        },
        allCoins: {
            default: [
                {"id":"bitcoin","name":"Bitcoin","symbol":"BTC","market_cap_rank":1,"thumb":"https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png","large":"https://assets.coingecko.com/coins/images/1/large/bitcoin.png"},
                {"id":"ethereum","name":"Ethereum","symbol":"ETH","market_cap_rank":2,"thumb":"https://assets.coingecko.com/coins/images/279/thumb/ethereum.png","large":"https://assets.coingecko.com/coins/images/279/large/ethereum.png"},
                {"id":"ripple","name":"XRP","symbol":"XRP","market_cap_rank":5,"thumb":"https://assets.coingecko.com/coins/images/44/thumb/xrp-symbol-white-128.png","large":"https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png"},
                {"id":"tether","name":"Tether","symbol":"USDT","market_cap_rank":6,"thumb":"https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png","large":"https://assets.coingecko.com/coins/images/325/large/Tether-logo.png"},
                {"id":"cardano","name":"Cardano","symbol":"ADA","market_cap_rank":7,"thumb":"https://assets.coingecko.com/coins/images/975/thumb/cardano.png","large":"https://assets.coingecko.com/coins/images/975/large/cardano.png"},
                {"id":"litecoin","name":"Litecoin","symbol":"LTC","market_cap_rank":10,"thumb":"https://assets.coingecko.com/coins/images/2/thumb/litecoin.png","large":"https://assets.coingecko.com/coins/images/2/large/litecoin.png"},
                {"id":"chainlink","name":"Chainlink","symbol":"LINK","market_cap_rank":11,"thumb":"https://assets.coingecko.com/coins/images/877/thumb/chainlink-new-logo.png","large":"https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png"},
            ]
        },
    },
    data () {
        return {
        }
    },
    created(){
        // this.getAllCoins();
    },
    methods: {
        goToCoinDescription(coinId){
            console.log('ENTER coinDescription for: ' + coinId)
            this.$router.push({ 
                name: 'Coin',
                params: {
                coinId: coinId
                }
            })
        },
        filterCoinAndSymbol(item, queryText, itemText) {
            return (
                item.id.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) >
                    -1 ||
                item.symbol.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1
            );
        }
    }
}
</script>

<style>

</style>