<template>
  <v-container>
    <!-- Start title and search bar -->
    <v-row
      align="center"
      justify="center"
    >
      <v-card
        elevation="0"
        color="rgb(255, 0, 0, 0)"
      >
        <v-card-title
          class="text-h3 font-weight-bold"
        >
          {{ pageTitle }}
        </v-card-title>
      </v-card>
    </v-row>
    <div
      v-if="!errorString"
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          align="center"
          justify="center"
        >
          <v-text-field
            label="Search blogs"
            class="px-12"
            solo
            dense
            v-model="searchVal"
            append-outer-icon="mdi-magnify"
          ></v-text-field>
        </v-col>
      </v-row>
      <!-- END title and search bar -->
      <v-row
        v-if="filteredBlogs.length"
        align="center"
        justify="center"
      >
        <v-col 
          align="center"
          v-for="(blog, idx) in filteredBlogs" 
          v-bind:key="idx">
          <BlogCard :blogData="blog" />
        </v-col>
      </v-row>
      <v-row
        v-else-if="loading"
        align="center"
        justify="center"
      >
        <v-col 
          align="center"
        >
          <v-skeleton-loader
              v-if="loading"
              type="card"
          ></v-skeleton-loader>
        </v-col>
        <v-col 
          align="center"
          justify="center"
        >
          <v-skeleton-loader
              v-if="loading"
              type="card"
          ></v-skeleton-loader>
        </v-col>
        <v-col 
          align="center"
          justify="center"
        >
          <v-skeleton-loader
              v-if="loading"
              type="card"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row
        v-else
        align="center"
        justify="center"
      >
        <h2>No blog posts match your search</h2>
      </v-row> 
    </div>
    <v-row
      v-else
      align="center"
      justify="center"
    >
      <h2
        class="text-h2 font-weight-bold"
      >Error Getting Blog Posts! Check back later.</h2>
    </v-row>
  </v-container>
</template>

<script>
import BlogCard from '@/components/BlogCard.vue'

export default {
    components: {
        BlogCard
    },
    metaInfo() {
      return {
        title: 'Blog',
        description: 'Our blog has the latest and greatest in the crypto space including coin reviews and news!',
        meta: [
          { property: 'og:type', content: 'website' },
          { property: 'og:url', content: `${this.$router.currentRoute.path}` },
          { property: 'og:title', content: 'Blog | The Crypto Masters' },
          { property: 'og:description', content: 'Our blog has the latest and greatest in the crypto space including coin reviews and news!' },
          { property: 'og:image', content: require('../assets/meta_tag_logo_blog.png') },

          { property: 'twitter:card', content: 'summary_large_image' },
          { property: 'twitter:url', content: `${this.$router.currentRoute.path}` },
          { property: 'twitter:title', content: 'Blog | The Crypto Masters' },
          { property: 'twitter:description', content: 'Our blog has the latest and greatest in the crypto space including coin reviews and news!' },
          { property: 'twitter:image', content: require('../assets/meta_tag_logo_blog.png') },
        ]
      }
    },
    data () {
      return {
        blogs: [],
        searchVal: '',
        loading: true,
        response: null,
        errorString: '',
        pageTitle: 'Blog Posts'
      }
    },
    created () {

      this.getContentVue();
    },
    methods: {
      async getContentVue() {
        this.loading = true;

        let theDocument = ''
      
        this.document = await this.$prismic.client.query(
          this.$prismic.Predicates.at('document.type', 'blog-article'),
          { pageSize: 20 },
          ( error, document ) => error ? this.errorString = error : theDocument = document
        )

        // console.log(theDocument)

        if(!this.errorString) {

          this.blogs = theDocument.results
          this.blogs.sort((a, b) => (a.data.release_date < b.data.release_date) ? 1 : -1)
          
          // console.log(this.blogs)
        }
        // this.filteredBlogs = this.blogs
        this.loading = false;
      },
    },
    computed: {
      filteredBlogs() {
        return this.blogs.filter(blog => {

            return blog.data['blog_title'][0].text.toLowerCase().includes(this.searchVal.toLowerCase())
        })
      }
    }
}
</script>

<style scoped>
/* this is for setting the max width of the search box */
.v-input {
  max-width: 800px;
}
.blog_card {
  /* overflow-y: auto;  */
  height: 520px;
  min-width: "344px";
  max-width: "345px";
}
</style>