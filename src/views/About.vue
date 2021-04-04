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
              class="text-left pb-8 text-h2 font-weight-bold"
            >
              {{ aboutText }}
            </v-card-title>
            <v-card-subtitle></v-card-subtitle>
            <v-card-actions></v-card-actions>
          </v-card>
        </v-col>
        <v-col
          sm="4"
        >
          <v-card
            class="pa-2 rounded-xl"
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
        class="pa-12"
      ></v-row>
      <v-container fluid>
        <v-row dense>
          <v-col
            v-for="info in aboutObject"
            :key=info.id
            class="mx-auto"
            primary
          >
            <v-card>
              <v-card-title
                center
              >
                <v-icon
                  x-large
                  center
                  color="primary"
                >
                  {{ info.icon }}
                </v-icon>
              </v-card-title>
              <v-card-text class="headline text-h6 font-weight-medium">
                {{ info.text }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <!-- <v-row
        class="pa-8"
      >
        <v-card
          class="justify-center mx-auto text-center pa-2 mt-8"
          color="rgb(255, 0, 0, 0)"
          elevation="0"
        >
          <v-card-title
            class="justify-center text-center pb-12 text-h3 font-weight-medium"
            color="rgb(255, 0, 0, 0)"
          >
            {{ aboutText }}
          </v-card-title>
          <v-card-subtitle
            class="text-left text-h5 font-weight-medium"
          > 
          <p
            class="text-left text-h5 font-weight-medium"
          >
            {{ tCMApproach }}
          </p>
          </v-card-subtitle>
          <v-card-actions></v-card-actions>
        </v-card> 
      </v-row> -->
  </v-container>
</template>

<script>
export default {
  name: 'About',
  components: {

  },
  data () {
    return {
      aboutText: 'About Us',
      tCMApproach: "The Crypto Masters Approach",
//       tCMApproach: "The goal of The Crypto Masters is to provide information to investors and potential investors of crypto assets to assist them in making their decisions regarding which crypto assets, if any, would be an appropriate investment for them. There are currently thousands of investable coins and tokens. Needless to say, not all of these assets merit an investment."
//         + "We believe that crypto assets are in the very early stage of their development. We also believe that the more widespread adoption of crypto assets is coming, but we do not know how soon. To be clear, we are not traders and do not offer trading advice. By this, we mean that we do not in any way attempt to predict short-term price movements and do not evaluate technical data such as moving averages of candlestick price patterns. If you are looking for that type of advice, we are not for you (but there are plenty on the internet)."
//         + "Our approach is long term. We don’t know if the level of widespread acceptance that will result in increased values is a matter of a year or several years, but it is not a matter of weeks. We seek to analyze, to some degree, different crypto assets and provide information that may prompt our listeners to further investigate a coin or token for possible investment, or perhaps to decide it is not an asset in which they are interested in investing."
//         +  "So, although we call ourselves The Crypto Masters, we are not attempting to provide substantial “deep dives” on the assets we are discussing. There simply is not time to do so. There are numerous resources on the internet for people to do more thorough investigations. However, we hope to provide sufficient information and personal opinions that our listeners and readers can form some preliminary opinions about different altcoins. From there, it is up to each investor to make their own investment decisions.",
        aboutObject: [
          { id: 0, icon: 'mdi-bullseye', text: "The goal of The Crypto Masters is to provide information to investors and potential investors of crypto assets to assist them in making their decisions." },
          { id: 1, icon: 'mdi-strategy', text: "Our approach is mainly in the long term. We seek to analyze, to some degree, different crypto assets and provide information that may prompt our listeners to do further investigation." },
          { id: 2, icon: 'mdi-hand-heart', text: "We provide sufficient information and personal opinions so that our listeners and readers can form some preliminary opinions about different crypto assets. It is up to each investor to make their own investment decisions!" },
        ],
    }
  }
}
</script>
