<template>
    <v-container>
      <v-row 
        justify="space-around"
        align="center"
      >
        <v-col
          sm="7"
        >
          <v-card
            class="pa-2 mt-8"
            elevation="0"
          >
            <v-card-title
              class="text-left pb-12 text-h3 font-weight-medium"
            >
              {{ catchPhrase }}
            </v-card-title>
            <v-card-subtitle
              class="text-h5 text-left"
              elevation="0"
            >
              {{ subPhrase }}
            </v-card-subtitle>
            <v-card-actions
            >
              <v-btn
                x-large
                color="success"
                dark
                @click="$router.push('/podcast/')"
              >
                Listen Now
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col
          sm="4"
        >
          <v-card
            class="pa-2 rounded-xl"
            elevation="2"
            color="primary"
          >
            <v-img 
              contain
              aspect-ratio="1"
              eager
              alt="The Crypto Masters"
              :src="require('../assets/crypto_masters_logo_withText.png')" 
            ></v-img>
          </v-card>
        </v-col>
      </v-row>
      <v-row
        class="pa-16"
      ></v-row>
      <v-row
        class="pa-8"
      ></v-row>
      <v-row
        align="center"
        justify="space-around"
      >
      <v-card
        class="pa-2 text-center primary"
        align="center"
        tile
        width="100%"
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
                :href="podcast.url"
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
      </v-row>
      <v-row
        class="pa-16"
      ></v-row>
      <v-row
        class="pa-8"
      ></v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Home',
  components: {
    
  },
  data () {
    return {
      catchPhrase: 'Helping You Master an Understanding of Crypto Assets',
      subPhrase: 'We provide information about crypto assets to allow the public to make their own decisions',
      podcasts: [
                { id: 0, icon: 'mdi-youtube', url: 'https://www.youtube.com/channel/UCyrKtJ25wtlemNHk5MG-9tQ' },
                { id: 1, icon: 'mdi-spotify', url: 'https://open.spotify.com/show/38kIh4n39NvSbUTJew7rF4?si=p5LCiy0fTKuZipgXDNpFbg' },
                { id: 2, icon: 'mdi-podcast', url: 'https://podcasts.apple.com/us/podcast/the-crypto-masters-podcast/id1507473032' },
                { id: 3, icon: 'mdi-amazon', url: 'https://www.amazon.com/The-Crypto-Masters-Podcast/dp/B08K59B5WN' },
                { id: 4, icon: 'mdi-google-podcast', url: 'https://podcasts.google.com/feed/aHR0cHM6Ly90aGVjcnlwdG9tYXN0ZXJzLnBvZGJlYW4uY29tL2ZlZWQueG1s' },
                
      ],
      socialMessage: 'TUNE IN TO OUR SHOW'
    }
  }
}
</script>

<style>
.v-card__text, .v-card__title {
  word-break: normal !important;
}

</style>