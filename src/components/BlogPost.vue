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
                        <b>Date: </b> {{ blogData.data['release_date'] }}
                    </p>
                </v-row>
                <v-row 
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
                        :src="blogData.data['blog_img']['url']" 
                        :alt="blogData.data['blog_img']['alt']"
                    ></v-img>
                </v-row>
                <!-- Pass the HTML Serializer to your rich text component. -->
                <prismic-rich-text
                    v-for="(item, idx) in blogData.data.body"
                    :key="idx"
                    :field="item" 
                    :htmlSerializer="htmlSerializer" 
                >
                </prismic-rich-text>

                <!-- <div 
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
                </div> -->
            </v-card>
            </v-row>
        </div>
    </div>
</template>

<script>
// import prismicDOM from 'prismic-dom'

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
                    text: 'Back to Blog',
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

                
                console.log('$$$$$$ Body items: ')
                console.log(this.blogData.data.body.__ob__.value[0].primary.text)
                console.log(this.blogData.data)

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