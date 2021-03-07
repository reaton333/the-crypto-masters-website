<template>
    <v-container>
        <CoinDetails/>
        <hr>
        <CoinChart/>
    </v-container>
</template>

<script>
import CoinDetails from '@/components/CoinDetails.vue'
import CoinChart from '@/components/CoinChart.vue'

export default {
    name: 'Coin',
    components: {
        CoinDetails,
        CoinChart
    },

}
</script>

<style>

</style>