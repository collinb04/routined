import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Blog from '@/views/Blog.vue'
import Pricing from '@/views/Pricing.vue'
import Product from '@/views/Product.vue'
import SessionView from '@/views/SessionView.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import Profile from '@/views/Profile.vue'
import Settings from '@/views/Settings.vue'
import FeedbackLibrary from '@/views/FeedbackLibrary.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/learn', component: Blog },
  { path: '/pricing', component: Pricing },
  { path: '/problems', component: Product, meta: { requiresAuth: true } },
  { path: '/session/:id', component: SessionView, props: true, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/settings', component: Settings, meta: { requiresAuth: true } },
  { path: '/feedback', component: FeedbackLibrary, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash }
    return { top: 0 }
  },
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()

  if (auth.isLoading) await auth.init()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { path: '/login' }
  }
})

export default router