<template>
    <v-footer
      padless
      primary
      width="100%"
    >
      <v-card
        flat
        tile
        class="primary text-center"
        width="inherit"
      >
        <v-card-text>
          <v-btn
            v-for="social in socials"
            :key="social.id"
            class="mx-4"
            color="secondary"
            icon
            @click="linkToNewTab(social.url)"
            name="socialLink"
          >
            <v-icon size="24px">
              {{ social.icon }}
            </v-icon>
          </v-btn>
          <v-btn 
            icon 
            class="mx-4"
            :href="'mailto:' + cryptoMastersEmail"
            name="emailLink"
          >
            <v-icon color="secondary">mdi-email</v-icon>
          </v-btn>
        </v-card-text>
        <v-card-text 
          class="text-center white--text pt-0"
          style="max-width:750px; text-align:center; margin:0 auto;"
        >
          {{ legalText }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          Copyright © <strong>TheCryptoMasters</strong> {{ new Date().getFullYear() }}
        </v-card-text>
      </v-card>
    </v-footer>
</template>

<script>
export default {
  data() {
    return {
        socials: [
            { id: 1, icon: 'mdi-facebook', url: 'https://www.facebook.com/TheCryptocurrencyMasters' },
            { id: 2, icon: 'mdi-twitter', url: 'https://twitter.com/theCryptoMS1' },
            { id: 3, icon: 'mdi-instagram', url: 'https://www.instagram.com/the_crypto_masters/' },
            { id: 4, icon: 'mdi-youtube', url: 'https://www.youtube.com/channel/UCyrKtJ25wtlemNHk5MG-9tQ' },
        ],
        cryptoMastersEmail: 'info@thecryptomasters.com',
        legalText: 'Nothing in our podcast, website, or social media should be considered investment advice. We are not financial advisors. Please do not consider any of our information or personal opinions to be investment advice.'
    }
  },
  methods: {
    linkToNewTab(theLink) {
      window.open(theLink, "_blank")
    }
  }
}
</script>

<style>

</style>