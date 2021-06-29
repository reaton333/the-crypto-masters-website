<template>
  <v-container>
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
      <div v-if="filteredEpisodes.length" class="episode-cards">
        <div class="card" v-for="episode in filteredEpisodes" v-bind:key="episode">
          <EpisodeCard :episodeData="episode" />
        </div>
      </div>
      <div v-else-if="loading">
        <v-row
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
      </div>
      <div v-else>
        <v-row
          align="center"
          justify="center"
        >
          <h2>No episodes match your search</h2>
        </v-row>
      </div>  
    </div>
    <div
      v-else
    >
      <v-row
        align="center"
        justify="center"
      >
        <h2
          class="text-h2 font-weight-bold"
        >Error Getting Episodes! Check back later.</h2>
      </v-row>
    </div>  
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

.wrap {
    width: 50%;
    margin: 0 auto;
    /* padding-bottom: 5%; */
}


.card {
  width: 25%;
  margin-bottom: 50px;
  transition: 0.2s;
}

.cards-container {
  width: 90%;
  margin: 50px auto;
}

.episode-cards {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-flow: wrap;
}

@media screen and (max-width: 2000px) {
  .card {
    width: 30%;
  }
}

@media screen and (max-width: 1000px) {
  .card {
    width: 40%;
  }
}

@media screen and (max-width: 620px) {
  .episode-cards {
    width: 100%;
  }

  .heading {
    padding: 20px;
    font-size: 20px;
  }

  .card {
    width: 80%;
  }
}
</style>