<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <CoinList/>
  </div>
</template>

<script>
// @ is an alias to /src
import CoinList from '@/components/CoinList.vue'

export default {
  name: 'Home',
  components: {
    CoinList
  }
}
</script>

<style>

</style>