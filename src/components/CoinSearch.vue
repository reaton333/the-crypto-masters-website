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
export default {
    name: 'CoinSearch',
    props: ['allCoins'],
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
    }
}
</script>

<style>

</style>