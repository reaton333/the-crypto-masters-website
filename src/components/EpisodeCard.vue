<template>
  <v-card
    max-width="344"
    class="episode_card flex d-flex flex-column"
  >
    <v-img
      :src="episodeData.data['episode-image'].url"
      lazy-src="url('assets/crypo_masters_logoIcon_withBg.png)"
      height="200px"
    ></v-img>
    <v-card-title>
      {{ episodeData.data['episode_title'][0].text }}
    </v-card-title>
    <v-card-subtitle class="flex">
      {{ episodeData.data['episode-summary'][0].text.substring(0, this.summaryCharLimit) + '.....'}}
      <!-- <v-divider></v-divider>
      <v-divider></v-divider> -->
    </v-card-subtitle>
    <v-card-actions>
      <v-btn
        @click="goToEpisode(episodeData.uid)"
        color="secondary"
        text
        class="font-weight-bold"
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
          summaryCharLimit: '200'
        }
    },
    props: {
        episodeData: null
    },
    created() {

      // console.log('Episode Data:' + this.episodeData.data['episode_title'][0].text)

    },
    methods: {
        goToEpisode(episodeId){
            // console.log(episodeId)
            this.$router.push({ 
                name: 'PodcastEpisode',
                params: {
                    episodeId: episodeId
                }
            })
        },
    }
}
</script>

<style>
.episode_card {
  overflow-y: auto; 
  height: 490px
}
</style>