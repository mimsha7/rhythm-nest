import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/auth/Login.vue'
import Signup from '@/views/auth/Signup.vue'
import CreatePlaylist from '@/views/Playlists/CreatePlaylist.vue'
import { projectAuth } from '@/firebase/config'
import PlayListDetails from '@/views/Playlists/playlistDetails.vue'
import UserPlaylists from '@/views/Playlists/userPlaylists.vue'

const requiredAuth = (to, from, next) => {
  let user = projectAuth.currentUser // Check if user is logged in
  if (!user) {
    next({ name: 'Login' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: requiredAuth //added route guard to protect this route
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/playlists/create',
    name: 'CreatePlaylist',
    component: CreatePlaylist,
    beforeEnter: requiredAuth //added route guard to protect this route
  },
  {
    path: '/playlists/:id',
    name: 'PlayListDetails',
    component: PlayListDetails,
    props: true,
    beforeEnter: requiredAuth //added route guard to protect this route
  },
  {
    path: '/playlists/user',
    name: 'UserPlaylists',
    component: UserPlaylists,
    beforeEnter: requiredAuth //added route guard to protect this route
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
