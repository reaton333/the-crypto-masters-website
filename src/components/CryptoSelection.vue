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
        label="Select Coin"
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
    </v-autocomplete>
</template>

<script>
import axios from 'axios';

export default {
    name: 'CoinSearch',
    props: {
        listLoading: {
            default: 'primary'
        },
        allCoins: {},
    },
    data () {
        return {
        }
    },
    mounted(){
        
        this.allCoins = this.$session.get('allCoins')
    
        if (!this.allCoins) {
            this.getAllCoins()
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
                console.log(this.allCoins)
                this.$session.set("allCoins", this.allCoins);
                this.$session.set("totalCoins", this.allCoins.length);
            } catch (e) {
                console.log(e);
            }

        },
    }
}
</script>

<style>

</style>