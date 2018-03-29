import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/Home/home'
import LivingEvents from '../components/LivingEvents/livingEvents'
import JingEvents from '../components/JingEvents/jingEvents'
import LivingDetail from '../components/LivingDetail/livingDetail'
import JingDetail from '../components/JingDetail/jingDetail'
import OddSetPage from '../components/OddSetPage/oddSetPage'
import Empty from '../components/Empty/empty'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/Home',
      name: 'Home',
      component: home
    },
    {
      path: '/LivingEvents',
      name: 'LivingEvents',
      component: LivingEvents
    },
    {
      path: '/JingEvents',
      name: 'JingEvents',
      component: JingEvents
    },
    {
      path: '/LivingDetail',
      name: 'LivingDetail',
      component: LivingDetail
    },
    {
      path: '/JingDetail',
      name: 'JingDetail',
      component: JingDetail
    },
    {
      path: '/OddSetPage',
      name: 'OddSetPage',
      component: OddSetPage
    },
    {
      path: '/Empty',
      name: 'Empty',
      component: Empty
    }
  ]
})
