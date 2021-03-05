<template>
    <div>
        <img class="coinDescriptionLogo" v-bind:src="coinImage" v-bind:alt="coinDetails.name"> 
        <h1>{{ coinDetails.name }}</h1>
        <div v-html="coinDescription"></div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            coinId: '',
            coinDetails: {},
            coinImage: '',
            coinDescription: '',
            coinGenesisDate: '',
        }
    },
    async created() {

        this.coinId = this.$route.params.coinId;

        const baseURL = `https://api.coingecko.com/api/v3/coins/`
        var apiParams = `?tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`

        try {
            const res = await axios.get(baseURL + this.coinId + apiParams)
 
            this.coinDetails = res.data;
            this.coinImage = this.coinDetails.image.large
            this.coinDescription = this.coinDetails.description.en
            this.coinGenesisDate = this.coinDetails.genesis_date
            console.log(this.coinGenesisDate)

        } catch (e) {
            if(e.response.status === 404) {
                console.log('ahhhhhhhhhhh')
                this.$router.push('/NotFound')
            }
            console.log(e.response.status);
        }
    },
}
</script>

<style>
.coinDescriptionLogo {
    width: 150px;
    height: 150px;
}

</style>