<template>
  <div>
    <img :src="episodeData.data['episode-image'].url" alt="">
    <div class="card-body">
        <h2>{{ episodeData.data['episode_title'][0].text }}</h2>
        <p>{{ episodeData.data['episode-summary'][0].text }}</p>
        <a class="episode-btn-link" @click="goToEpisode(episodeData.uid)">Go to Episode</a>
    </div>    
  </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        episodeData: null
    },
    created() {

    },
    methods: {
        goToEpisode(episodeName){
            console.log(episodeName)
            this.$router.push({ 
                name: 'PodcastEpisode',
                params: {
                    episodeName: episodeName
                }
            })
        },
    }
}
</script>

<style>

.card-header {
  padding: 50px 10px;
  object-fit: contain;
}
img {
    max-width: 100%;
    max-height: 100%;
}

.card-body {
  padding: 30px 20px;
  text-align: center;
  font-size: 18px;
  overflow: auto;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 40px -10px rgba(0, 0, 0, 0.25);
}

.card-body .episode-btn-link {
  display: block;
  color: #fff;
  text-align: center;
  background: linear-gradient(to right, #ff416c, #ff4b2b);
  margin-top: 30px;
  text-decoration: none;
  padding: 10px 5px;
  cursor: pointer;
}

@media screen and (max-width: 1000px) {
  .card {
    width: 40%;
  }
}

@media screen and (max-width: 620px) {
  .container {
    width: 100%;
  }

  .heading {
    padding: 20px;
    font-size: 20px;
  }

  .card {
    width: 80%;
  }
}
</style>