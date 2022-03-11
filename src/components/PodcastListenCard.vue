<template>
    <v-card
      class="pa-2 text-center primary"
      align="center"
      width="100%"
      max-width="1100"
    >
      <v-card-title
        class="justify-center white--text text-h4"
      >
        {{ socialMessage }}
      </v-card-title>
      <v-divider
        dark
      ></v-divider>
        <v-row
          align="center"
          justify="space-around"
        >
          <v-col
            class="pa-10"
            v-for="podcast in podcasts"
            :key="podcast.id"
          >
            <v-btn
              class="mx-4 white--text space-around"
              icon
              x-large
              @click="linkToNewTab(podcast.url)"
              name="podcast"
            >
              <v-icon 
                size="72px"
                color="secondary"
              >
                {{ podcast.icon }}
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
</template>

<script>
export default {
  data() {
    return {
      podcasts: [
        { id: 0, icon: 'mdi-youtube', url: 'https://www.youtube.com/channel/UCyrKtJ25wtlemNHk5MG-9tQ' },
        { id: 1, icon: 'mdi-spotify', url: 'https://open.spotify.com/show/38kIh4n39NvSbUTJew7rF4?si=p5LCiy0fTKuZipgXDNpFbg' },
        { id: 2, icon: 'mdi-podcast', url: 'https://podcasts.apple.com/us/podcast/the-crypto-masters-podcast/id1507473032' },
        { id: 3, icon: 'mdi-google-podcast', url: 'https://podcasts.google.com/feed/aHR0cHM6Ly90aGVjcnlwdG9tYXN0ZXJzLnBvZGJlYW4uY29tL2ZlZWQueG1s' },        
      ],
      socialMessage: 'TUNE IN TO OUR SHOW'
    }
  },
  methods: {
    linkToNewTab(theLink) {
      window.open(theLink, "_blank")
    },
  }
}
</script>

<style>

</style>