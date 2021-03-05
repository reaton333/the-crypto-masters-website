<template>
  <div>
    <h1 class="header">Episode List</h1>
    <v-chip
  color="yellow"
></v-chip>
    <div class="wrap">
        <div class="search">
            <input type="text" class="searchTerm" v-model="searchVal" placeholder="Search Our Episodes">
            <v-btn elevation="2" type="submit" class="searchButton">
                <i class="fa fa-search"></i>
            </v-btn>
        </div>
    </div>
    <div v-if="filteredEpisodes.length" class="episode-cards">
        <div class="card" v-for="episode in filteredEpisodes" v-bind:key="episode">
            <EpisodeCard :episodeData="episode" />
        </div>
    </div>
    <div v-else>
        <h2>No Episodes match your inquiry</h2>
    </div>    
  </div>
</template>

<script>
import axios from 'axios';
import EpisodeCard from '@/components/EpisodeCard.vue'

export default {
    components: {
        EpisodeCard
    },
    data () {
        return {
            episodes: [],
            searchVal: ''
        };
    },
    async created () {

        this.getContent();
    },
    methods: {
        async getContent() {

            const MASTER_REF = 'YDwCJBAAACAA0Sam'
            const baseURL = `https://the-crypto-masters-website.cdn.prismic.io/api/v2/documents/search?ref=${MASTER_REF}`
            var apiParams = `&format=json`

            var full_path = baseURL + apiParams;
            console.log(full_path);

            try {
                const res = await axios.get(full_path)

                this.episodes = res.data.results;
                this.filteredEpisodes = this.episodes
                // console.log(this.results)
            } catch (e) {
                if(e.response.status === 404) {
                    console.log('ahhhhhhhhhhh')
                    this.$router.push('/NotFound')
                }
                console.log(e.response.status);
            }
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

.search {
  width: 100%;
  display: flex;
}

.searchTerm {
  width: 100%;
  border: 3px solid black;
  border-right: none;
  padding: 5px;
  height: 20px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: grey;
}

.searchTerm:focus{
  color: black;
}

.searchButton {
  width: 40px;
  height: 36px;
  border: 1px solid black;
  background: black;
  text-align: center;
  color: #fed502;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
}

.wrap {
    width: 50%;
    margin: 0 auto;
    padding-bottom: 5%;
}

.header {
    padding-bottom: 20px;
}

.card {
  width: 25%;
  background: #fff;
  border: 1px solid #ccc;
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