<template>
    <v-card
        width="100%"
        max-width="900"
    >
        <v-card-title
            class="justify-center text-h4"
            style="background: #E9C46A"
        >
            Recent Videos
        </v-card-title>
        <v-carousel
            cycle
            height="475"
            show-arrows-on-hover
            dark
            class="height-carousel" 
            style="max-width: 900px; max-height: 475px; overflow: hidden"
            
        >
            <v-carousel-item
                v-for="(episode, index) in episodes"
                :key="index"
                :src="episode.snippet.thumbnails.high.url"
                reverse-transition="fade-transition"
                transition="fade-transition"
                @click="linkToVideo(episode.id.videoId)"
            ></v-carousel-item>
        </v-carousel>
    </v-card>
</template>

<script>
import axios from 'axios';

export default {

    data () {
        return {
            loading: false,
            youtubeVideoBase: 'https://www.youtube.com/watch?v=',
            apiKey: 'AIzaSyBykn2bRD5xV2nn3G8gvoU8Q2ezxwjuCu0',
            channelId: 'UCyrKtJ25wtlemNHk5MG-9tQ',
            maxResults: '5',
            orderBy: 'date',
            apiData: null,
            episodes: [],
        }
    },
    async created() {

        this.getChannelVideos()

    },
    methods: {
        async getChannelVideos() {

            var fullPath = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${this.channelId}&maxResults=${this.maxResults}&order=${this.orderBy}&type=video&key=${this.apiKey}`

            this.loading = true

            // console.log(fullPath)

            try {
                const res = await axios.get(fullPath)

                this.apiData = res.data
                this.episodes = this.apiData.items
            } catch (e) {
                console.log('ERROR!!!!!!!!!!')
            }

            this.loading = false
        },
        linkToVideo(theVideoId) {

            console.log('ENTER linkToVideo for ' + theVideoId)

            var baseUrl = 'https://www.youtube.com/watch?v='

            window.open(baseUrl + theVideoId, "_blank")
        }
    }


}
</script>