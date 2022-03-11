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
            class="text-left pb-12 font-weight-bold
              text-xl-h3 text-lg-h3 text-md-h3 text-sm-h4 text-h4 
              "
          >
            {{ catchPhrase }}
          </v-card-title>
          <v-card-subtitle
            class="text-left font-weight-medium
              text-xl-h5 text-lg-h5 text-md-h5 text-sm-h6 text-subtitle-2"
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
                class="text-left font-weight-medium
                text-xl-body-1 text-lg-body-1 text-md-body-1 text-sm-body-2 text-body-2"
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
                class="text-left black--text font-weight-medium
                text-xl-body-1 text-lg-body-1 text-md-body-1 text-sm-body-2 text-body-2"
                @click="$router.push('/crypto')"
              >
                Crypto Prices
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
            alt="The Crypto Masters Logo"
            :src="require('../assets/crypto_masters_logo_withText_rounded.svg')" 
          ></v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      class="pa-12"
    ></v-row>
    <v-row
      align="center"
      justify="space-around"
    >
      <PodcastListenCard />
    </v-row>
    <v-spacer
      class="pa-12"
    ></v-spacer>
    <v-row
      align="center"
      justify="center"
    >
    </v-row>
    <CryptoToolCard align="center" justify="space-around" max-width="1100" />
    <v-spacer
      class="pa-12"
    ></v-spacer>
    <v-row
      align="center"
      justify="center"
    >
        <YoutubeCarousel />
    </v-row>
    <v-row
      class="pa-12"
    ></v-row>
  </v-container>
</template>

<script>
import PodcastListenCard from '@/components/PodcastListenCard.vue'
import YoutubeCarousel from '@/components/YoutubeCarousel.vue'
import CryptoToolCard from '@/components/CryptoToolCard.vue'

export default {
  name: 'Home',
  metaInfo() {
    return {
      title: 'Podcasts, Articles, Prices, and More!',
      meta: [
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: `${this.$router.currentRoute.path}` },
        { property: 'og:title', content: 'Podcasts, Articles, Prices, and More! | The Crypto Masters' },
        { property: 'og:description', content: 'Helping You Master an Understanding of Crypto Assets' },
        { property: 'og:image', content: require('../assets/meta_tag_logo.png') },

        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:url', content: `${this.$router.currentRoute.path}` },
        { property: 'twitter:title', content: 'Podcasts, Articles, Prices, and More! | The Crypto Masters' },
        { property: 'twitter:description', content: 'Helping You Master an Understanding of Crypto Assets' },
        { property: 'twitter:image', content: require('../assets/meta_tag_logo.png') },
      ]
    }
  },
  components: {
    PodcastListenCard,
    YoutubeCarousel,
    CryptoToolCard
  },
  data () {
    return {
      metaLogo: require('../assets/meta_tag_logo.png'),
      catchPhrase: 'Helping You Master an Understanding of Crypto Assets',
      subPhrase: 'We provide information about crypto assets to assist the public in making their own investment decisions',
    }
  },
  methods: {
  }
}
</script>

<style>
.v-card__text, .v-card__title {
  word-break: normal !important;
}

</style>