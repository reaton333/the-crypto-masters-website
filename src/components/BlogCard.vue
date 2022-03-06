<template>
  <v-card
    max-width="344"
    class="primary blog_card d-flex flex-column"
    align="left"
    dark
  >
    <v-img
      :src="blogData.data['blog_img'].url"
      lazy-src="url('assets/crypo_masters_logoIcon_withBg.png)"
      height="50%"
    ></v-img>
    <v-card-title class="font-weight-bold">
      {{ this.blogTitle }}
    </v-card-title>
    <v-card-text class="flex">
      {{ this.blogData.data['release_date'] }}
    </v-card-text>
    <v-card-actions>
      <v-btn
        @click="goToBlog(blogData.uid)"
        color="secondary"
        text
        class="font-weight-bold"
      >
        Go to Blog
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
      return {
        titleCharLimit: 45,
        summaryCharLimit: 175,
        blogTitle: '',
        blogSummary: '',
      }
  },
  props: {
      blogData: ''
  },
  created() {

    var tempTitle = this.blogData.data['blog_title'][0].text

    if (tempTitle.length > this.titleCharLimit) {
      this.blogTitle = tempTitle.substring(0, this.titleCharLimit) + '...'
    } else {
      this.blogTitle = tempTitle
    }
   
  },
  methods: {
    goToBlog(blogId){
      // console.log(blogId)
      this.$router.push({ 
        name: 'BlogPost',
        params: {
          blogId: blogId
        }
      })
    },
  }
}
</script>

<style>
.blog_card {
  /* overflow-y: auto;  */
  height: 520px
}
</style>