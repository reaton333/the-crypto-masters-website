<template>
    <v-carousel 
        cycle
        show-arrows-on-hover
        style="width:480px;height:360px;"
    >
        <v-carousel-item
            v-for="(episode, index) in episodes"
            :key="index"
            :src="episode.snippet.thumbnails.high.url"
            style="width:480px;height:360px;"
        >
            <div 
                class="display-2"
                align="center"
                justify="center"        
            >
                {{ episode.snippet.title }}
            </div>    
        </v-carousel-item>
    </v-carousel>
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
            maxResults: '7',
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
    }


}
</script>