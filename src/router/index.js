import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Coin from '../views/Coin.vue'
import CoinList from '../views/CoinList.vue'
import PodcastEpisode from '../components/PodcastEpisode.vue'
import EpisodeList from '../components/EpisodeList.vue'
import NotFound from '../views/NotFound.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

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
    path: '/crypto/page=:pageNumber?',
    name: 'CoinList',
    component: CoinList
  },
  {
    path: '/coin/:coinId',
    name: 'Coin',
    component: Coin
  },
  {
    path: '/podcast/:episodeName',
    name: 'PodcastEpisode',
    component: PodcastEpisode
  },
  {
    path: '/podcast',
    name: 'EpisodeList',
    component: EpisodeList
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

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
