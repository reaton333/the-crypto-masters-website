<template>
  <v-container
    style="max-width: 900px"
  >
    <!-- <v-breadcrumbs
        :items="breadCrumbItems"
        customDivider
        divider="/"
    ></v-breadcrumbs> -->
    <v-row 
        justify="space-around"
        align="center"
    >
        <h1
            class="text-h3 font-weight-bold"
        >
            {{ title }}
        </h1>
    </v-row>
    <v-row 
        justify="space-around"
        align="center"
    >
        <v-img 
            v-if="logoURL" 
            align="center"
            justify="space-around"
            max-height="402"
            max-width="402"
            :src="logoURL" 
            :alt="logoAlt"
        ></v-img>
    </v-row>
    <!-- depending on the type of object we get back from the CRM
    I want to display it according it in an element that cooresponds to 
    it's given type -->
    <v-spacer
    >
    </v-spacer>
    <div 
        v-for="item in episodeSummary"
        :key="item"
    >

        <v-row 
            v-if="item.type == 'embed'"
            justify="space-around"
            align="center"
            class="py-6 ma-2"
            
        >
            <div
                v-html="item.oembed.html"
            >
            </div>
        </v-row>
        <v-row
            v-if="item.type == 'paragraph'"
            justify="left"
            align="left"
            class="text-justify"
        >
            <p>
                {{ item.text }}
            </p>
        </v-row>
        <v-row
            v-if="item.type == 'heading2'"
            justify="left"
            align="left"
        >
            <p 
                class="text-justify text-h4 font-weight-bold"
            >
                {{ item.text }}
            </p>
        </v-row>
        <v-row
            v-if="item.type == 'heading3'"
            justify="left"
            align="left"
        >
            <p 
                class="text-justify text-h5 font-weight-bold"
            >
                {{ item.text }}
            </p>
        </v-row>
        <v-row
            v-if="item.type == 'heading4'"
            justify="left"
            align="left"
        >
            <p 
                class="text-justify text-h6 font-weight-bold"
            >
                {{ item.text }}
            </p>
        </v-row>
        <v-row
            v-if="item.type == 'heading5'"
            justify="left"
            align="left"
        >
            <p     
                class="text-justify text-h6 font-weight-bold"
            >
                {{ item.text }}
            </p>
        </v-row>
        <v-row
            v-if="item.type == 'heading6'"
            justify="left"
            align="left"
        >
            <p 
                class="text-justify text-h6 font-weight-medium"
            >
                {{ item.text }}
            </p>
        </v-row>
    </div>
  </v-container>
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
        breadCrumbItems: [
            {
                text: 'Back to Episodes',
                disabled: false,
                href: '/podcast',
            },
        ],
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

            const MASTER_REF = 'YJxtshEAAGb8P2zH'
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
                this.episodeSummary = this.results["episode-summary"]
                console.log(this.episodeName)

            } catch (e) {
                if(e.response === 404) {
                    console.log('ahhhhhhhhhhh')
                    this.$router.push('/NotFound')
                } else {
                    console.log('Status is unknown')
                }
                console.log(e.response);
            }
        }
    },
}
</script>

<style>
/* iframe {
    width: 900 !important; 
    height: 508 !important;
}   */
@media screen and (max-width: 2000px) {
    iframe {
        width: 900px !important;
        height: 508px !important;
    }  
} 

@media screen and (max-width: 980px) {
    iframe {
        width: 600px !important;
        height: 339px !important;
    }  
} 

@media screen and (max-width: 650px) {
  iframe {
        width: 300px !important; 
        height: 169px !important;
    }
}
</style>