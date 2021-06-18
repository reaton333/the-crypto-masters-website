<template>
    <div>
        <v-row>
            <v-breadcrumbs
                :items="breadCrumbItems"
                customDivider
                divider="/"
            ></v-breadcrumbs>
        </v-row>

        <div 
            v-if="loading"
            class="pt-12"
            max-width="900px" 
            align="center"
            justify="center"
        >
            <v-skeleton-loader
                v-if="loading"                    
                max-width="950"
                min-width="300"
                type="article, image"
            ></v-skeleton-loader>
        </div>
        <div v-else>
            <v-container
                style="max-width: 900px"
            >
                <v-row 
                    justify="space-around"
                    align="center"
                >
                    <h1
                        class="
                            text-h4 
                            text-md-h3
                            text-sm-h4
                            font-weight-bold"
                    >
                        {{ episodeData.data['episode_title'][0].text }}
                    </h1>
                </v-row>
                <v-row 
                    justify="space-around"
                    align="center"
                    class="pa-8"
                >
                    <v-img 
                        v-if="episodeData.data['episode-image']['url']" 
                        align="center"
                        class="episodeImage"
                        contain
                        justify="space-around"
                        max-height="350"
                        max-width="350"
                        :src="episodeData.data['episode-image']['url']" 
                        :alt="episodeData.data['episode-image']['alt']"
                    ></v-img>
                </v-row>
                <!-- depending on the type of object we get back from the CRM
                I want to display it according it in an element that cooresponds to 
                it's given type -->
                <v-spacer
                >
                </v-spacer>
                <div 
                    v-for="(item, index) in episodeSummary"
                    :key="index"
                    class="px-4 py-2"
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
                            class="
                                text-justify 
                                text-h5 
                                text-md-h4 
                                font-weight-bold"
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
                            class="
                                text-justify 
                                text-h6 
                                text-md-h5 
                                font-weight-bold"
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
                            class="
                                text-justify 
                                text-subtitle-1 
                                text-md-h6  
                                font-weight-bold"
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
                            class="
                                text-justify 
                                text-subtitle-1 
                                text-md-h6  
                                font-weight-bold"
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
                            class="
                                text-justify 
                                text-subtitle-1 
                                text-md-h6  
                                font-weight-medium"
                        >
                            {{ item.text }}
                        </p>
                    </v-row>
                </div>
            </v-container>
        </div>
    </div>
</template>

<script>

export default {
    metaInfo() {
        return {
            title: `${this.episodeName}`,
            description: `${this.episodeSummary}`,
            meta: [
                { property: 'og:type', content: 'website' },
                { property: 'og:url', content: `${this.$router.currentRoute.path}` },
                { property: 'og:title', content: `${this.episodeName} | The Crypto Masters` },
                { property: 'og:description', content: `${this.episodeSummary}` },
                { property: 'og:image', content: `${this.episodeImage}` },
            ]
        }
    },
    data () {
        return {
            loading: false,
            episodeData: '',
            prismicPageType: 'episode-summary',
            episodeSummary: '',
            episodeId: '',
            episodeName: '',
            episodeImage: '',
            breadCrumbItems: [
                {
                    text: 'Back to Episodes',
                    disabled: false,
                    href: '/podcast',
                },
            ],
        }
    },
    async created () {

        // this.episodeName = this.$route.params.episodeName;
        this.episodeId = this.$route.params.episodeId;
        this.getContentVue(this.episodeId);
        // console.log('ENTER Create in Podcast Episode: ' + this.episodeId);

    },
    methods: {

        async getContentVue(theEpisodeId){

            this.loading = true
            // console.log('ENTER getContentVue for: ' + theEpisodeId)

            // Query the API and assign the response to "response"
            const response = await this.$prismic.client.getByUID(this.prismicPageType, theEpisodeId)
            this.response = response  
            // console.log('$$$$Prismic response: ', this.response)
            if (this.response) {
                this.episodeData = this.response
                this.episodeName = this.episodeData.data['episode_title'][0].text
                this.episodeImage = this.episodeData.data['episode-image']['url']
                console.log(this.episodeImage)
                this.episodeSummary = this.episodeData.data['episode-summary']
            } else {
                this.loading = false
                this.$router.push('/NotFound')
            }
            

            this.loading = false
        },
    },
}
</script>

<style>
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
        width: 450px  !important; 
        height: 253px !important;
    }
    .episodeImage {
        width: 301px !important; 
        height: 301px !important;
    }
}

@media screen and (max-width: 500px) {
    iframe {
        width: 300px !important; 
        height: 169px !important;
    }
    .episodeImage {
        width: 201px !important; 
        height: 201px !important;
    }
}
</style>