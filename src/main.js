import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

// Import projectAuth
import { projectAuth } from './firebase/config'

let app

projectAuth.onAuthStateChanged(() => { // This will run whenever the authentication state changes
  if (!app) {
    app = createApp(App).use(router).mount('#app')
  }
})
