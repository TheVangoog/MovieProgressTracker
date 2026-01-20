import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShowDetailView from '../views/ShowDetailView.vue'
import AboutView from '../views/AboutView.vue'
import Browse from '../views/Browse.vue'
import ProfileView from '../views/ProfileView.vue'
import AuthView from '../views/AuthView.vue'
import FeedbackView from '../views/FeedbackView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/browse',
      name: 'browse',
      component: Browse,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
    },
    { path: '/show/:id', name: 'ShowDetailView',
      component: ShowDetailView },
    {
        path: '/feedback', name: 'feedback',
         component: FeedbackView
    },
  ],
})

export default router
