<template>
  <v-card
    max-width="344"
  >
    <v-img
      :src="episodeData.data['episode-image'].url"
      height="200px"
    ></v-img>
    <v-card-title>
      {{ episodeData.data['episode_title'][0].text }}
    </v-card-title>
    <v-card-subtitle>
      {{ episodeData.data['episode-summary'][0].text }}
    </v-card-subtitle>
    <v-card-actions>
      <v-btn
        @click="goToEpisode(episodeData.uid)"
        color="orange lighten-2"
        text
      >
        Go to Episode
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        episodeData: null
    },
    created() {

    },
    methods: {
        goToEpisode(episodeName){
            console.log(episodeName)
            this.$router.push({ 
                name: 'PodcastEpisode',
                params: {
                    episodeName: episodeName
                }
            })
        },
    }
}
</script>

<style>
/* .card {
  border: none !important;
}z */
</style>