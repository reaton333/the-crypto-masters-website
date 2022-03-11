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
                type="image, article"
            ></v-skeleton-loader>
        </div>
        <div 
            v-else
        >
            <v-row 
                justify="space-around"
                align="center"
                class="pb-8"
            >
            <v-card
                class="pa-8"
                align="center"
                justify="center"
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
                            font-weight-bold
                            px-4"
                    >
                        {{ episodeData.data['episode_title'][0].text }}
                    </h1>
                </v-row>
                <v-row>
                    <p
                        justify="space-around"
                        align="left"
                        class="text-justify pa-4"
                    >
                        <b>Release Date</b> {{ episodeData.data['release_date'] }}
                    </p>
                </v-row>
                <div 
                    v-for="(item, index) in youtubeVideo"
                    :key="index"
                    class="px-4 py-2 text-h6"
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
                </div>
                <!-- depending on the type of object we get back from the CRM
                I want to display it according it in an element that cooresponds to 
                it's given type -->
                <v-spacer
                >
                </v-spacer>
                <div 
                    v-for="(item, index) in episodeSummary"
                    :key="index"
                    class="px-4 py-2 text-h6"
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
                        style="max-width: 750px"
                    >
                        <p v-html="item.text"></p>
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
            </v-card>
            </v-row>
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
            youtubeVideo: '',
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
                // console.log(this.episodeImage)
                this.episodeSummary = this.episodeData.data['episode-summary']
                this.youtubeVideo = this.episodeData.data['youtube-link']
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
@media screen and (min-width: 981px) {
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

.episode-div {
    background-color: white;
}
</style>