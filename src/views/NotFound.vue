<template>
  <!-- <h1>404 Page not found!</h1> -->
  <div class="fourOhfour">
    <kinesis-container class="container">
        <kinesis-element :strength="150">
          <img class="kinesis_logo" src="../assets/crypto_masters_logo_404.svg" alt="logrocket logo">
          <div>We can't find the page you are looking for</div>
        </kinesis-element>
        <!-- background-circles-props -->
        <kinesis-element :strength="50" axis="y">
          <img class="circle bitcoin-circle" src="../assets/crypto_imgs/bitcoin-btc-logo.png" alt="logrocket logo">
        </kinesis-element>
        <kinesis-element :strength="80" axis="y">
          <img class="circle ethereum-circle" src="../assets/crypto_imgs/ethereum-eth-logo.png" alt="logrocket logo">
        </kinesis-element>
        <kinesis-element :strength="80" axis="y">
          <img class="circle cardano-circle" src="../assets/crypto_imgs/cardano-ada-logo.png" alt="logrocket logo">
        </kinesis-element>
        <kinesis-element :strength="80" axis="y">
          <img class="circle chainlink-circle" src="../assets/crypto_imgs/chainlink-link-logo.png" alt="logrocket logo">
        </kinesis-element>
        <kinesis-element :strength="80" axis="y">
          <img class="circle monero-circle" src="../assets/crypto_imgs/monero-xmr-logo.png" alt="logrocket logo">
        </kinesis-element>
      </kinesis-container>
    </div>
</template>

<script>
export default {
  data () {
    return {
      bitcoinLogo: '../assets/crypto_imgs/bitcoin-btc-logo.png'
    }
  }

}
</script>

<style>

.fourOhfour {
  text-align: center;
}

.kinesis_logo {
  width: 20rem;
}

.container {
  padding: 8rem 0;
}

.circle {
  position: absolute;
  border-radius: 100%;
}

.bitcoin-circle {
  width: 10rem;
  height: 10rem;
  left: 10%;
  top: 25%;
}

.ethereum-circle {
  width: 8rem;
  height: 8rem;
  right: -2%;
  bottom: 17%;
}
.cardano-circle {
  width: 5rem;
  height: 5rem;
  left: 20%;
  bottom: 17%;
}

.chainlink-circle {
  width: 3rem;
  height: 3rem;
  top: 80%;
  left: 60%;
}

.monero-circle {
  width: 6rem;
  height: 6rem;
  top: 50%;
  left: 40%;
}

</style>