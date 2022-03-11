import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import Home from '../views/Home.vue'
import Coin from '../views/Coin.vue'
import CoinList from '../views/CoinList.vue'
import CryptoPredictor from '../components/CryptoPredictor.vue'
import PriceAtMarketCap from '../components/PriceAtMarketCap.vue'
import PodcastEpisode from '../components/PodcastEpisode.vue'
import EpisodeList from '../components/EpisodeList.vue'
import BlogList from '../components/BlogList.vue'
import BlogPost from '../components/BlogPost.vue'
import NotFound from '../views/NotFound.vue'
import About from '../views/About.vue'

Vue.use(Router)
Vue.use(Meta, {
  keyName: 'metaInfo',
  attribute: 'data-vue-meta',
  ssrAttribute: 'data-vue-meta-server-rendered',
  tagIDKeyName: 'vmid',
  refreshOnceOnNavigation: true
})

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/crypto',
    name: 'CoinList',
    component: CoinList
  },
  {
    path: '/coin/:coinId',
    name: 'Coin',
    component: Coin
  },
  {
    path: '/profitCalculator',
    name: 'CryptoPredictor',
    component: CryptoPredictor
  },
  {
    path: '/priceAtMarketCap',
    name: 'PriceAtMarketCap',
    component: PriceAtMarketCap
  },
  {
    path: '/podcast',
    name: 'EpisodeList',
    component: EpisodeList
  },
  {
    path: '/podcast/:episodeId',
    name: 'PodcastEpisode',
    component: PodcastEpisode
  },
  {
    path: '/blog',
    name: 'Blog',
    component: BlogList
  },
  {
    path: '/blog/:blogId',
    name: 'BlogPost',
    component: BlogPost
  },
  {
    path: '/404', 
    component: NotFound 
  },  
  { 
    path: "/:catchAll(.*)", 
    redirect: '/404' 
  }, 
  // {
  //   path: '/coinlist',
  //   name: 'CoinList',
  //   component: CoinList
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new Router({
  routes,
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        selector: to.hash
      };
    } else {
      return { x: 0, y: 0 };
    }
  }
})

export default router
