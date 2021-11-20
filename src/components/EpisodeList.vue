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
          Episodes
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
          cols="8"
        >
            <v-text-field
              label="Search Episodes"
              solo
              dense
              v-model="searchVal"
              append-outer-icon="mdi-magnify"
            ></v-text-field>
        </v-col>
      </v-row>
      <!-- END title and search bar -->
      <v-row
        v-if="filteredEpisodes.length" class="episode-cards"
        align="center"
        justify="center"
      >
        <v-col 
          align="center"
          justify="center"
          v-for="episode in filteredEpisodes" 
          v-bind:key="episode">
          <EpisodeCard :episodeData="episode" />
        </v-col>
      </v-row>
      <v-row
        v-else-if="loading"
        align="center"
        justify="center"
      >
        <v-skeleton-loader
            v-if="loading"
            class="mx-auto mb-6"
            max-width="344"
            min-width="300"
            type="card"
        ></v-skeleton-loader>
        <v-skeleton-loader
            v-if="loading"
            class="mx-auto"
            max-width="344"
            min-width="300"
            type="card"
        ></v-skeleton-loader>
        <v-skeleton-loader
            v-if="loading"
            class="mx-auto"
            max-width="344"
            min-width="300"
            type="card"
        ></v-skeleton-loader>
      </v-row>
      <v-row
        v-else
        align="center"
        justify="center"
      >
        <h2>No episodes match your search</h2>
      </v-row> 
    </div>
    <v-row
      v-else
      align="center"
      justify="center"
    >
      <h2
        class="text-h2 font-weight-bold"
      >Error Getting Episodes! Check back later.</h2>
    </v-row>
  </v-container>
</template>

<script>
import EpisodeCard from '@/components/EpisodeCard.vue'

export default {
    components: {
        EpisodeCard
    },
    metaInfo() {
      return {
        title: 'Podcast Episodes',
        description: 'Check out our latest episodes where we take a look at various crypto assets and latest crypto news.',
        meta: [
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: `${this.$router.currentRoute.path}` },
            { property: 'og:title', content: 'Podcast Episodes | The Crypto Masters' },
            { property: 'og:description', content: 'Check out our latest episodes where we take a look at various crypto assets and latest crypto news.' },
            { property: 'og:image', content: require('../assets/meta_tag_logo_podcast.png') },

            { property: 'twitter:card', content: 'summary_large_image' },
            { property: 'twitter:url', content: `${this.$router.currentRoute.path}` },
            { property: 'twitter:title', content: 'Podcast Episodes | The Crypto Masters' },
            { property: 'twitter:description', content: 'Check out our latest episodes where we take a look at various crypto assets and latest crypto news.' },
            { property: 'twitter:image', content: require('../assets/meta_tag_logo_podcast.png') },
        ]
      }
    },
    data () {
        return {
            episodes: [],
            searchVal: '',
            loading: true,
            response: null,
            errorString: '',
        };
    },
    created () {

        // this.getContent();
        this.getContentVue();
    },
    methods: {
      async getContentVue() {
        this.loading = true;

        var theDocument = ''
      
        this.document = await this.$prismic.client.query(
          this.$prismic.Predicates.at('document.type', 'episode-summary'),
          { pageSize: 50 },
          ( error, document ) => error ? this.errorString = error : theDocument = document
        )

        if(!this.errorString) {

          this.episodes = theDocument.results
          this.episodes.sort((a, b) => (a.data.release_date < b.data.release_date) ? 1 : -1)
          // console.log(this.episodes)
        }
        
        // this.filteredEpisodes = this.episodes
        this.loading = false;
      },
    },
    computed: {
        filteredEpisodes() {
            return this.episodes.filter(episode => {

                return episode.data['episode_title'][0].text.toLowerCase().includes(this.searchVal.toLowerCase())
            })
        }
    }
}
</script>

<style>
</style>