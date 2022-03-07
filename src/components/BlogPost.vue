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
                        {{ blogData.data['blog_title'][0].text }}
                    </h1>
                </v-row>
                <v-row>
                    <p
                        justify="space-around"
                        align="left"
                        class="text-justify pa-4"
                    >
                        <b>Last Updated: </b> {{ blogData.data['release_date'] }}
                    </p>
                </v-row>
                <v-row 
                    justify="space-around"
                    align="center"
                >
                    <v-img 
                        align="center"
                        class="episodeImage"
                        contain
                        justify="space-around"
                        max-height="350"
                        max-width="350"
                        :src="blogData.data['blog_img']['url']" 
                        :alt="blogData.data['blog_img']['alt']"
                    ></v-img>
                </v-row>
                <!-- Loop through slices from prismic CM and produce cooresponding data -->
                <v-row
                    v-for="(item, idx) in blogData.data.body"
                    :key="idx"
                    justify="space-around"
                    align="center"
                    class="py-8"
                    style="max-width: 750px"
                >
                    <div
                        v-if="item.slice_type == 'text'"
                    >
                        <prismic-rich-text
                            :field="item.primary.text"
                            align="left"
                            max-width="640px"
                        />
                        <hr v-if="idx != (blogData.data.body.length - 1)">
                    </div>
                    <div
                        v-if="item.slice_type == 'youtube_link'"
                        v-html="item.primary.youtube_video_link.html"
                    >
                    </div>
                    <v-row 
                        v-if="item.slice_type == 'image'"
                        justify="space-around"
                        align="center"
                        class="pa-8"
                    >
                        <v-img
                            align="center"
                            class="episodeImage"
                            contain
                            justify="space-around"
                            max-height="350"
                            max-width="350"
                            :src="item.primary.image.url" 
                            :alt="item.primary.image.alt"
                        ></v-img>
                    </v-row>
                    <v-card
                        v-if="item.slice_type == 'quote'"
                        class="mx-auto px-auto"
                        color="#eee"
                        max-width="700"
                    >
                        <v-card-text 
                            class="
                                text-h5 
                                text-md-h4
                                text-sm-h5
                                font-weight-bold
                            "
                        >
                            {{ item.primary.quote[0].text }}
                        </v-card-text>

                        <v-card-actions>
                            <v-list-item class="grow">

                            <v-list-item-content>
                                <v-list-item-title
                                    class="
                                        subtitle-2
                                        text-md-subtitle-1
                                        text-sm-subtitle-2
                                        text-xs-body-1
                                    "
                                >
                                    - {{ item.primary.quote_author[0].text }}
                                </v-list-item-title>
                            </v-list-item-content>
                            </v-list-item>
                        </v-card-actions>
                    </v-card>
                </v-row>                
            </v-card>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
    metaInfo() {
        return {
            title: `${this.blogTitle} ${this.tcmTitle}`,
            // description: `${this.episodeSummary}`,
            meta: [
                { property: 'og:type', content: 'website' },
                { property: 'og:url', content: `${this.$router.currentRoute.path}` },
                { property: 'og:title', content: `${this.blogTitle} ${this.tcmTitle}` },
                // { property: 'og:description', content: `${this.episodeSummary}` },
                { property: 'og:image', content: `${this.blogImg}` },
            ]
        }
    },
    data () {
        return {
            loading: false,
            blogData: '',
            prismicPageType: 'blog-article',
            blogTitle: '',
            tcmTitle: ' | The Crypto Masters Blog',
            blogImg: '',
            breadCrumbItems: [
                {
                    text: 'Back to Blog Search',
                    disabled: false,
                    href: '/blog',
                },
            ],
        }
    },
    async created () {

        // this.episodeName = this.$route.params.episodeName;
        this.blogId = this.$route.params.blogId
        this.getContentVue(this.blogId)
        // console.log('Blog ID: ', this.blogId)
        // console.log('ENTER Create in Podcast Episode: ' + this.episodeId);

    },
    methods: {

        async getContentVue(theBlogId){

            this.loading = true
            // console.log('ENTER getContentVue for: ' + theBlogId)

            // Query the API and assign the response to "response"
            const response = await this.$prismic.client.getByUID(this.prismicPageType, theBlogId)
            this.response = response  
            console.log('$$$$Prismic response: ', this.response)
            if (this.response) {
                this.blogData = this.response
                this.blogTitle = this.blogData.data['blog_title'][0].text
                this.blogImg = this.blogData.data['blog_img']['url']

                
                console.log('$$$$$$ blogData.data.body: ')
                // console.log(this.blogData.data.body.__ob__.value[0].primary.text)
                console.log(this.blogData.data.body)

            } else {
                this.loading = false
                this.$router.push('/NotFound')
            }
            
            this.loading = false
        },
        htmlSerializer(type, element, content, children) {
            // If element is a list item,
            if (type === "list-item") {
            // return some customized HTML.
            return `<li class="example-class">${children.join("")}</li>`;
            }
            /// Otherwise, return null.
            return null;
        }
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