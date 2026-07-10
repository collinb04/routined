import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createAuth0 } from '@auth0/auth0-vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(createAuth0({
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  authorizationParams: {
    redirect_uri: window.location.origin + '/login/callback'
  }
}, {
  // If auth0-vue's internal handling of the redirect throws (e.g. the token
  // exchange itself gets rejected), it force-navigates to this path instead
  // of silently defaulting to '/'.
  errorPath: '/login',
}))
// Note: auth0-vue auto-processes the redirect internally and, once done,
// router.push()es to appState.target (default '/'). We steer that target
// via appState in loginWithRedirect() calls (see Login.vue/Signup.vue)
// rather than fighting it with skipRedirectCallback — trying to do the
// callback handling ourselves raced against the plugin's own internal
// checkSession() fallback and was less reliable.
app.mount('#app')