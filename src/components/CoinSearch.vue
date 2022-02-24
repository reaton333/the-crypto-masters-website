<template>
    <v-autocomplete
        v-model="model"
        :items="coins"
        :filter="filterCoinAndSymbol"
        :loading="listLoading"
        :allow-overflow="false"
        :search-input.sync="search"
        placeholder="Start typing to Search"
        item-text="name"
        item-value="id"
        :no-data-text="noMatchedSearch"
        auto-select-first
        dense
        solo
        filled
        label="Search"
        @input="goToCoinDescription"
    >
        <template v-slot:item="data">
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
</template>

<script>
import axios from 'axios';

export default {
    name: 'CoinSearch',
    props: {},
    data () {
        return {
            search: null,
            model: null,
            coins: [],
            // listLoading: 'primary',
            listLoading: false,
            noMatchedSearch: '',
            minSearchLength: 2
        }
    },
    created(){},
    methods: {
        async searchCoins(val) {

            this.listLoading = 'primary'

            try {
                const baseURL = `https://api.coingecko.com/api/v3/search?`
                const params = val
                const fullPath = baseURL + params
                // console.log(fullPath)
                const res = await axios.get(fullPath)

                this.coins = res.data.coins;
            } catch (e) {
                console.log(e);
            }
            this.listLoading = false
            if (!this.coins) {
                this.noMatchedSearch = "No coins match your search"
            }
        },
        goToCoinDescription(coinId){
            // console.log('ENTER coinDescription for: ' + coinId)
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
    },
    watch: {
        async search(val) {
            this.search = val
            if (val.length < this.minSearchLength) {
                console.log('Do nothing!')
            } else {
                console.log('API query time!')
                await this.searchCoins(val)
            }
        },
    },
}
</script>

<style>

</style>