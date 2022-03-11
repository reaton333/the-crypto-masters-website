<template>
  <v-card
    max-width="344"
    class="primary blog_card d-flex flex-column"
    align="left"
    dark
  >
    <v-img
      class="mt-2"
      contain
      :src="blogData.data['blog_img'].url"
      :alt="this.blogTitle"
      lazy-src="url('assets/crypo_masters_logoIcon_withBg.png)"
      height="250px"
    ></v-img>
    <v-card-title class="font-weight-bold">
      {{ this.blogTitle }}
    </v-card-title>
    <v-card-text class="flex">
      {{ blogReleaseDate }}
    </v-card-text>
    <v-card-text>
      <v-chip
          v-for="(tag, idx) in blogData.tags"
          :key="idx"
          color="secondary"
          text-color="primary"
          pill
          light
          class="mr-1 mb-1 font-weight-bold"
      >
          {{ tag }}
      </v-chip>
    </v-card-text>
    <v-card-actions>
      <v-btn
        @click="goToBlog(blogData.uid)"
        color="secondary"
        text
        class="font-weight-bold"
        name="goToBlog"
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
        blogReleaseDate: '',
        READ_TIME_TEXT: ' MIN READ',
        LAST_UPDATE_TEXT: 'Last Update: ',
        readTime: 0,
      }
  },
  props: {
      blogData: ''
  },
  created() {

    let tempTitle = this.blogData.data['blog_title'][0].text

    if (tempTitle.length > this.titleCharLimit) {
      this.blogTitle = tempTitle.substring(0, this.titleCharLimit) + '...'
    } else {
      this.blogTitle = tempTitle
    }

    const theDate = new Date(this.blogData.data.release_date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    this.blogReleaseDate = theDate.toLocaleDateString('en-us', options)


    this.setReadTime(this.blogData.body)
   
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
    async setReadTime(blogDataBody) {

      let blogText = ''
      
      if (blogDataBody) {
        blogText = blogDataBody.filter(body => body.slice_type === 'text')
      }

      // console.log(blogText)
      let totalBlogText = ''
      let averageWordsPerMinute = 250

      for(let i = 0; i < blogText.length; i++) {
          let currBlogText = blogText[i]

          let blogTextArr = currBlogText.primary.text
          for(let j = 0; j < blogTextArr.length; j++) {
              totalBlogText += blogTextArr[j].text
          }
      }
      // console.log(totalBlogText)
      this.readTime =  Math.ceil(totalBlogText.split(/\s+/).length / averageWordsPerMinute)
    },
  }
}
</script>

<style>
.blog_card {
  height: 600px !important;
}
</style>