<script lang="ts">
import { defineComponent } from 'vue'
import axios from "axios"
import { useRoute } from "vue-router"
import { useProfileStore } from "@/stores/profile"
import { useAuthStore } from "@/stores/auth"
import type { ShowStatus } from "@/stores/profile"

const API_KEY = import.meta.env.VITE_TMDB_KEY

export default defineComponent({
  name: 'ShowDetailView',
  data() {
    return {
      show: null as any,
      route: useRoute(),
      profileStore: useProfileStore(),
      authStore: useAuthStore(),
      isFavourite: false
    }
  },
  computed: {
    currentStatus(): ShowStatus | null {
      if (!this.show) return null
      return this.profileStore.getShowStatus(this.show.id)
    },
    currentShow() {
      if (!this.show) return null
      return this.profileStore.savedShows.find(s => s.tmdb_id === this.show.id)
    }
  },
  mounted() {
    const id = this.route.params.id
    
    // Fetch saved shows if not already loaded
    if (this.authStore.user?.id) {
      this.profileStore.fetchSavedShows(this.authStore.user.id)
        .then(() => {
          const existing = this.profileStore.savedShows.find(s => s.tmdb_id === parseInt(id as string))
          if (existing) {
            this.isFavourite = existing.is_favourite
          }
        })
    }
    
    // Fetch show details from TMDB
    axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
      params: { api_key: API_KEY }
    })
    .then(res => {
      this.show = res.data
      const existing = this.profileStore.savedShows.find(s => s.tmdb_id === res.data.id)
      if (existing) {
        this.isFavourite = existing.is_favourite
      }
    })
    .catch(err => console.error(err))
  },
  methods: {
    async saveShowAs(status: ShowStatus) {
      if (!this.show || !this.authStore.user) {
        console.error('Must be logged in to save shows')
        return
      }

      await this.profileStore.saveShow(
        this.show.id,
        this.show.name,
        status,
        this.show.poster_path ? `https://image.tmdb.org/t/p/w500${this.show.poster_path}` : undefined,
        this.authStore.user.id,
        this.isFavourite
      )
    },
    async toggleFavourite() {
      if (!this.show || !this.authStore.user) return
      this.isFavourite = !this.isFavourite
      
      const status = this.currentStatus || 'planning'
      await this.profileStore.saveShow(
        this.show.id,
        this.show.name,
        status,
        this.show.poster_path ? `https://image.tmdb.org/t/p/w500${this.show.poster_path}` : undefined,
        this.authStore.user.id,
        this.isFavourite
      )
    },
    async removeShowFromList() {
      if (!this.show || !this.authStore.user) return
      await this.profileStore.removeShow(this.show.id, this.authStore.user.id)
      this.isFavourite = false
    }
  }
})
</script>

<template>
  <div v-if="show" class="relative w-screen h-screen text-white">
    <div
      class="absolute inset-0 bg-cover bg-center filter brightness-50"
      :style="{ backgroundImage: 'url(https://image.tmdb.org/t/p/original' + show.backdrop_path + ')' }"
    ></div>

    <div class="relative z-10 p-8 flex flex-col items-start h-full justify-center max-w-3xl">
      <h1 class="text-5xl font-bold mb-4">{{ show.name }}</h1>
      <p class="mb-4">{{ show.overview }}</p>
      <p class="mb-2">Seasons: {{ show.number_of_seasons }}</p>
      <p class="mb-4">Rating: {{ show.vote_average }}</p>

      <!-- Status Buttons -->
      <div v-if="authStore.isAuthenticated" class="flex gap-2 flex-wrap mt-4">
        <button 
          @click="saveShowAs('planning')"
          :class="['btn', currentStatus === 'planning' ? 'btn-accent' : 'btn-outline btn-accent']"
        >
          📌 {{ currentStatus === 'planning' ? 'Planning' : 'Plan to Watch' }}
        </button>
        <button 
          @click="saveShowAs('watching')"
          :class="['btn', currentStatus === 'watching' ? 'btn-info' : 'btn-outline btn-info']"
        >
          📺 {{ currentStatus === 'watching' ? 'Watching' : 'Watching' }}
        </button>
        <button 
          @click="saveShowAs('watched')"
          :class="['btn', currentStatus === 'watched' ? 'btn-success' : 'btn-outline btn-success']"
        >
          ✅ {{ currentStatus === 'watched' ? 'Watched' : 'Mark as Watched' }}
        </button>
        <button 
          @click="saveShowAs('dropped')"
          :class="['btn', currentStatus === 'dropped' ? 'btn-error' : 'btn-outline btn-error']"
        >
          ❌ {{ currentStatus === 'dropped' ? 'Dropped' : 'Mark as Dropped' }}
        </button>
        <button 
          @click="toggleFavourite"
          :class="['btn', isFavourite ? 'btn-warning' : 'btn-outline btn-warning']"
        >
          ⭐ {{ isFavourite ? 'Favourite' : 'Add to Favourites' }}
        </button>
        <button 
          v-if="currentStatus"
          @click="removeShowFromList"
          class="btn btn-ghost"
        >
          🗑️ Remove from List
        </button>
      </div>
      <p v-else class="mt-4 text-sm opacity-70">
        <RouterLink to="/auth" class="link">Login</RouterLink> to save shows to your list
      </p>
    </div>
  </div>
</template>

<style scoped></style>
