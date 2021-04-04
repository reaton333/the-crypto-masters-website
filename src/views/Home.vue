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
          color="rgb(255, 0, 0, 0)"
          elevation="0"
        >
          <v-card-title
            class="text-left pb-12 
              text-xl-h3 text-lg-h3 text-md-h3 text-sm-h4 text-xs-h4 
              font-weight-bold"
          >
            {{ catchPhrase }}
          </v-card-title>
          <v-card-subtitle
            class="text-left
              text-xl-h5 text-lg-h5 text-md-h5 text-sm-h6 text-xs-h6"
            elevation="0"
          >
            {{ subPhrase }}
          </v-card-subtitle>
          <v-card-actions
            align="left"
          >
            <!-- <v-row 
              justify="space-around"
            > -->
              <v-btn
                x-large
                color="success"
                dark
                class="text-left
                text-xl-body-1 text-lg-body-1 text-md-body-1 text-sm-body-2 text-xs-body-2"
                @click="$router.push('/podcast/')"
              >
                Listen Now
                <v-icon
                  right
                  dark
                >
                  mdi-podcast
                </v-icon>
              </v-btn>
              <v-btn
                x-large
                color="secondary"
                dark
                class="text-left black--text
                text-xl-body-1 text-lg-body-1 text-md-body-1 text-sm-body-2 text-xs-body-2"
                @click="$router.push('/crypto')"
              >
                Crypto
                <v-icon
                  right
                  light
                >
                  mdi-bitcoin
                </v-icon>
              </v-btn>
            <!-- </v-row> -->
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
        sm="4"
      >
        <v-card
          class=""
          color="rgb(255, 0, 0, 0)"
          elevation="0"
        >
          <v-img 
            contain
            aspect-ratio="1"
            eager
            alt="The Crypto Masters"
            :src="require('../assets/crypto_masters_logo_withText_rounded.svg')" 
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