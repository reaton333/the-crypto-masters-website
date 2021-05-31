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
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="6"
      >
          <v-text-field
            label="Search Episodes"
            solo
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
        <h2>No Episodes match your inquiry</h2>
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
    data () {
        return {
            episodes: [],
            searchVal: '',
            loading: true,
            response: null,
        };
    },
    async created () {

        // this.getContent();
        this.getContentVue();
    },
    methods: {
      async getContentVue() {
        this.loading = true;
        // console.log('ENTER getContentVue()')
        // Query the API and assign the response to "response"
        const response = await this.$prismic.client.query('')
        this.response = response  
        // console.log('Prismic response: ', this.response)  
        
        this.episodes = this.response.results;
        this.filteredEpisodes = this.episodes
        this.loading = false;
        // console.log(this.episodes)
      },
      // async getContent() {

      //     const MASTER_REF = 'YJtEMhEAACMAOife'
      //     const baseURL = `https://the-crypto-masters-website.cdn.prismic.io/api/v2/documents/search?ref=${MASTER_REF}`
      //     var apiParams = `&format=json`

      //     var full_path = baseURL + apiParams;
      //     console.log(full_path);

      //     try {
      //         const res = await axios.get(full_path)

      //         this.episodes = res.data.results;
      //         this.filteredEpisodes = this.episodes
      //         this.loading = false;
      //         // console.log(this.results)
      //     } catch (e) {
      //         if(e.response.status === 404) {
      //             console.log('ahhhhhhhhhhh')
      //             this.$router.push('/NotFound')
      //         }
      //         console.log(e.response.status);
      //     }
      // },
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