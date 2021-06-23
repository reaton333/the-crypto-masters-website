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
      {{ this.episodeTitle }}
    </v-card-title>
    <v-card-subtitle class="flex">
      {{ this.episodeSummary }}
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
          titleCharLimit: 45,
          summaryCharLimit: 175,
          episodeTitle: '',
          episodeSummary: '',
        }
    },
    props: {
        episodeData: null
    },
    created() {

      // console.log('Episode Data:' + this.episodeData.data['episode_title'][0].text)
      
      var tempTitle = this.episodeData.data['episode_title'][0].text
      var tempSummary = this.episodeData.data['episode-summary'][0].text

      if (tempTitle.length > this.titleCharLimit) {
        this.episodeTitle = tempTitle.substring(0, this.titleCharLimit) + '...'
      } else {
        this.episodeTitle = tempTitle
      }

      if (tempSummary.length > this.summaryCharLimit) {
        this.episodeSummary = tempSummary.substring(0, this.summaryCharLimit) + '.....'
      } else {
        this.episodeSummary = tempSummary
      }
      

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
  /* overflow-y: auto;  */
  height: 520px
}
</style>