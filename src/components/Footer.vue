<template>
    <v-footer
      
      padless
      primary
    >
      <v-card
        flat
        tile
        class="primary text-center"
      >
        <v-card-text>
          <v-btn
            v-for="social in socials"
            :key="social.id"
            class="mx-4 white--text"
            icon
            :href="social.url"
          >
            <v-icon size="24px">
              {{ social.icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
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
                { id: 5, icon: 'mdi-rss', url: 'https://feed.podbean.com/thecryptomasters/feed.xml' },
            ],
            legalText: 'Nothing in our podcasts or on our web sites or social media outlets should be considered to be investment advice. We are not financial advisors. Please do not consider any of our information or personal opinions to be investment advice.'
        }
    }

}
</script>

<style>

</style>