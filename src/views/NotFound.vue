<template>
  <!-- <h1>404 Page not found!</h1> -->
  <div class="fourOhfour">
    <kinesis-container class="container">
        <kinesis-element :strength="150">
          <img class="kinesis_logo" src="../assets/crypto_masters_logo_404.svg" alt="Crypto Masters 404 Image">
          <div
            class="pb-8 text-xl-h4 text-lg-h4 text-md-h4 text-sm-h4 text-h5 font-weight-bold"
          >
            {{ notFoundError }}
          </div>
          <div
            class="pb-2 text-xl-h5 text-lg-h5 text-md-h5 text-sm-h5 text-h6 font-weight-bold"
          >
            {{ randomJoke[0] }}
          </div>
          <div
            class="text-xl-h5 text-lg-h5 text-md-h5 text-sm-h5 text-h6"
          >
            {{ randomJoke[1] }}
          </div>
        </kinesis-element>
      </kinesis-container>
    </div>
</template>

<script>
export default {
  data () {
    return {
      notFoundError: 'Error! Page Not found.',
      bitcoinLogo: '../assets/crypto_imgs/bitcoin-btc-logo.png',
      randomJoke: [],
      cryptoJokes : [
        [ 'Why won’t the government embrace Bitcoin?', 'They hate the idea of Proof Of Work.' ],
        [ 'What\'s the difference between SpaceX and Bitcoin?', 'SpaceX will actually return to earth after takeoff…' ],
        [ 'Why is Bitcoin difficulty so high?', 'Too much hash.' ],
        [ 'How many miners does it take to change a light bulb?', 'One miner to change it, and 999,999 miners to run in circles to determine who gets to do it.' ],
        [ 'Why did the hipster Bitcoin miner burn out his GPU?', 'He was mining before it was cool.' ],
        [ 'Where does an Eskimo keep his Bitcoin?', 'In a cold wallet.' ],
        [ 'Why do bitcoiners hate Ferraris?', 'Because it is owned by Fiat' ],
        [ 'Why can\'t vegans mine NEO?', 'They can\'t provide proof of steak!' ],        
      ],
    }
  },
  created() {
    this.randomJoke = this.cryptoJokes[Math.floor(Math.random()*this.cryptoJokes.length)];
  }

}
</script>

<style>

.fourOhfour {
  text-align: center;
  padding: 3rem 0;
}

.kinesis_logo {
  width: 20rem;
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
  top: 70%;
  left: 40%;
}

.polkadot-circle {
  width: 3rem;
  height: 3rem;
  left: 5%;
  top: 25%;
}

.litecoin-circle {
  width: 5rem;
  height: 5rem;
  left: 70%;
  bottom: 17%;
}


@media screen and (max-width: 620px) {
  .circle {
    visibility: hidden
  }
}


</style>