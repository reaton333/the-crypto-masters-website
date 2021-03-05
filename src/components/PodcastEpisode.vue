<template>
  <div>
    <h1>{{ title }}</h1>
    <img v-if="logoURL" class="episodeImage" :src="logoURL" :alt="logoAlt"/>
    <p>{{ episodeSummary }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
        title: null,
        logoURL: '',
        logoAlt: '',
        episodeSummary: null,
        episodeName: null,
        results: []
    };
  },
    async created () {

        this.episodeName = this.$route.params.episodeName;
        this.getContent(this.episodeName);
        console.log(this.episodeName);

    // console.log
    },
    methods: {
        async getContent(theEpisodeName) {
        //   const Prismic = require('@prismicio/client')

            console.log('ENTER getContent() for: ' + theEpisodeName)

            const MASTER_REF = 'YDwCJBAAACAA0Sam'
            const baseURL = `https://the-crypto-masters-website.cdn.prismic.io/api/v2/documents/search?ref=${MASTER_REF}&`
            var apiParams = `q=%5B%5Bat(my.episode-summary.uid%2C+%22${theEpisodeName}%22)%5D%5D&format=json`
            /////////////////q=[at(my.episode-summary.uid, "${episode uid here}")]

            var full_path = baseURL + apiParams;
            // var full_path = `https://the-crypto-masters-website.prismic.io/api/v1/documents/search?ref=YDmf-hEAACAAxpwC&access_token=MC5ZRG1sNkJFQUFDSUF4cllj.77-977-977-977-9fjXvv71RMjNcdO-_vQbvv70Z77-977-9Qi3vv73vv73vv70zNjh5Yu-_vSI7ew&q=%5B%5Bat(my.episode-summary.uid%2C+%222-ethereum%22)%5D%5D&access_token=MC5ZRG1sNkJFQUFDSUF4cllj.77-977-977-977-9fjXvv71RMjNcdO-_vQbvv70Z77-977-9Qi3vv73vv73vv70zNjh5Yu-_vSI7ew&format=json`;
                          // https://the-crypto-masters-website.prismic.io/api/v1/documents/search?ref=YDmf-hEAACAAxpwC&access_token=MTYxNDM5NDQzMDEwOS5ZRG1tTGhFQUFDQUF4cmRV.Yn19R--_vVs3E--_ve-_vTMT77-9UWlT77-977-9YEHvv71O77-9IO-_vVEMeO-_vXnvv73vv70&q=%5B%5Bat(my.episode-summary.uid%2C+%22litcoin%22)%5D%5D&access_token=MTYxNDM5NDQzMDEwOS5ZRG1tTGhFQUFDQUF4cmRV.Yn19R--_vVs3E--_ve-_vTMT77-9UWlT77-977-9YEHvv71O77-9IO-_vVEMeO-_vXnvv73vv70&format=json
            try {
                const res = await axios.get(full_path)
    
                // this.coinDetails = res.data;
                console.log(full_path)
                // console.log(res.data.results)

                this.results = res.data.results[0].data;

                console.log(`text: ${this.results.episode_title[0].text}`)

                this.title = this.results.episode_title[0].text
                this.logo = this.results["episode-image"]
                this.logoURL = this.results["episode-image"].url
                this.logoAlt = this.results["episode-image"].alt
                this.episodeSummary = this.results["episode-summary"][0].text
                console.log(this.episodeName)

            } catch (e) {
                if(e.response.status === 404) {
                    console.log('ahhhhhhhhhhh')
                    this.$router.push('/NotFound')
                } else {
                    console.log('Status is unknown')
                }
                console.log(e.response.status);
            }
        }
    },
}
</script>

<style>
.episodeImage {

    width: 502px;
}
</style>