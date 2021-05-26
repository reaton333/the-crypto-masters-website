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
              <div
                class="pa-6 text-center"
              >
                <v-icon
                  size="70"
                  center
                  color="primary"
                >
                  {{ info.icon }}
                </v-icon>
              </div>
              <v-card-title
                class="font-weight-bold text-h5"
              >
                {{ info.title }}
              </v-card-title>
              <v-card-text class="headline text-h6 font-weight-medium">
                {{ info.text }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-container fluid>
        <v-row dense>
          <v-col
            class="mx-auto pr-4"
            primary
          >
            <v-card>
              <v-avatar
                class="profile"
                color="grey"
                size="164"
              >
                <v-img src="../assets/brian_headshot.jpeg"></v-img>
              </v-avatar>
              <v-card-title
                class="font-weight-bold text-h5"
              >
                {{ brianObject.fullName }}
              </v-card-title>
              <v-card-text class="headline text-h6 font-weight-medium">
                {{ brianObject.aboutText }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col
            class="mx-auto"
            primary
          >
            <v-card>
              <v-avatar
                class="profile"
                color="grey"
                size="164"
              >
                <v-img src="../assets/ross_headshot.png"></v-img>
              </v-avatar>
              <v-card-title
                class="font-weight-bold text-h5"
              >
                {{ rossObject.fullName }}
              </v-card-title>
              <v-card-text class="headline text-h6 font-weight-medium">
                {{ rossObject.aboutText }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
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
          { id: 0, icon: 'mdi-bullseye', title: 'Our Goal', text: "Provide information about crypto assets to assist with making your own decisions" },
          { id: 1, icon: 'mdi-strategy', title: 'Focus', text: "We focus on cryptocurrency mainly as a long term investment" },
          { id: 2, icon: 'mdi-hand-heart', title: 'Helping You', text: "We do the hard research and provide you an overview of the key details" },
          // { id: 3, icon: 'mdi-clock-outline', text: "Focused on crypto assets for a long term investment. We see crypto as the future of currency and finance" },
        ],
        brianObject: { 
          id: 0, image: '../assets/brian_headshot.jpeg', fullName: 'Brian McCoy', aboutText: 'Hey I\'m Brian. Hedge fund manager and full time lawyer.', email: 'brian@thecryptomasters.com', instagram: '@brianmccoy81', twitter: '@cryptolerable'
        },
        rossObject: { 
          id: 1, image: '../assets/ross_headshot.png', fullName: 'Ross Eaton', aboutText: 'Hello I\'m Ross. Data analyst and computer nerd.', email: 'ross@thecryptomasters.com', instagram: '@rossbo3', twitter: '@RosstheCryptoB1'
        },
    }
  }
}
</script>
