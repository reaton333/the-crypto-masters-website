<template>
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
</template>

<script>
import axios from 'axios';

export default {
    name: 'CoinSearch',
    data () {
        return {
            allCoins: [],
        }
    },
    created(){
        this.getAllCoins();
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
            this.totalCoins = this.allCoins.length;
        } catch (e) {
            console.log(e);
        }

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
    }
}
</script>

<style>

</style>