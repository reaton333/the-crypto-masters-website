<template>
    <v-autocomplete
          v-model="allCoins"
          :items="allCoins"
          :filter="filterCoinAndSymbol"
          :loading="listLoading"
          :allow-overflow="false"
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
    created(){
        // this.getAllCoins();
        // console.log(this.allCoins)
    },
    methods: {
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
    }
}
</script>

<style>

</style>