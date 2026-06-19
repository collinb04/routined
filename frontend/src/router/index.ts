import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Blog from '@/views/Blog.vue'
import Pricing from '@/views/Pricing.vue'
import Product from '@/views/Product.vue'
import SessionView from '@/views/SessionView.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/learn', component: Blog },
  { path: '/pricing', component: Pricing },
  { path: '/problems', component: Product },
  { path: '/session', component: SessionView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash }
    return { top: 0, behavior: 'smooth' }
  },
})
