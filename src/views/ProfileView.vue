<script lang="ts">
import { defineComponent } from 'vue'
import { useProfileStore } from "@/stores/profile"
import { useAuthStore } from "@/stores/auth"
import { useRouter } from "vue-router"
import type { ShowStatus } from "@/stores/profile"

const statusConfig: Record<ShowStatus, { color: string; label: string; emoji: string }> = {
  planning: { color: "badge-accent", label: "Planning", emoji: "📌" },
  watching: { color: "badge-info", label: "Watching", emoji: "📺" },
  watched: { color: "badge-success", label: "Watched", emoji: "✅" },
  dropped: { color: "badge-error", label: "Dropped", emoji: "❌" },
}

export default defineComponent({
  name: 'ProfileView',
  data() {
    return {
      profileStore: useProfileStore(),
      authStore: useAuthStore(),
      router: useRouter(),
      statusConfig
    }
  },
  computed: {
    user() {
      const authUser = this.authStore.user
      if (!authUser) return this.profileStore.userInfo
      
      const userInfo = {
        id: authUser.id,
        name: authUser.user_metadata?.username || authUser.email?.split('@')[0] || 'User',
        email: authUser.email || '',
        avatar: authUser.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${authUser.email}`,
        bio: authUser.user_metadata?.bio || 'Passionate about TV shows and movies.',
        joinDate: new Date(authUser.created_at || Date.now()).toLocaleDateString(),
      }
      
      return userInfo
    }
  },
  async mounted() {
    if (!this.authStore.isAuthenticated) {
      this.router.push('/auth')
    } else {
      if (this.authStore.user?.id) {
        await this.profileStore.fetchSavedShows(this.authStore.user.id)
      }
    }
  },
  watch: {
    'authStore.user'(newUser) {
      if (!newUser) {
        this.router.push('/auth')
      }
    }
  }
})
</script>

<template>
  <main class="min-h-screen p-4 bg-base-200">
    <!-- Profile Header -->
    <div class="max-w-6xl mx-auto">
      <div class="card bg-base-100 shadow-lg mb-6">
        <div class="card-body items-center text-center">
          <!-- Avatar -->
          <div class="avatar mb-4">
            <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img :src="user.avatar" :alt="user.name" />
            </div>
          </div>

          <!-- User Info -->
          <h1 class="card-title text-3xl">{{ user.name }}</h1>
          <p class="text-sm opacity-70">{{ user.email }}</p>
          <p class="text-sm opacity-70">Joined {{ user.joinDate }}</p>

          <!-- Bio -->
          <p class="mt-4 max-w-md">{{ user.bio }}</p>

          <!-- Stats -->
          <div class="stats shadow mt-6 w-full max-w-2xl">
            <div class="stat">
              <div class="stat-title">Total Shows</div>
              <div class="stat-value text-primary">{{ profileStore.totalShowsCount }}</div>
            </div>
            <div class="stat">
              <div class="stat-title">Planning</div>
              <div class="stat-value text-accent">{{ profileStore.planningCount }}</div>
            </div>
            <div class="stat">
              <div class="stat-title">Watching</div>
              <div class="stat-value text-info">{{ profileStore.watchingCount }}</div>
            </div>
            <div class="stat">
              <div class="stat-title">Watched</div>
              <div class="stat-value text-success">{{ profileStore.watchedCount }}</div>
            </div>
            <div class="stat">
              <div class="stat-title">Favourites</div>
              <div class="stat-value text-warning">{{ profileStore.favouriteCount }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Shows Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Planning -->
        <div class="card bg-base-100 shadow-lg">
          <div class="card-body">
            <h2 class="card-title text-accent text-lg">📌 Planning ({{ profileStore.planningCount }})</h2>
            <div v-if="profileStore.showsByStatus('planning').length === 0" class="opacity-70 text-sm">
              No shows planned yet.
            </div>
            <div v-else class="space-y-2">
              <div
                v-for="show in profileStore.showsByStatus('planning')"
                :key="show.tmdb_id"
                class="flex items-center justify-between p-2 bg-base-200 rounded hover:bg-base-300 transition"
              >
                <div class="flex-1">
                  <p class="text-sm font-medium">{{ show.name }}</p>
                  <div class="flex gap-1 mt-1">
                    <span v-if="show.is_favourite" class="badge badge-warning badge-sm">⭐ Fav</span>
                  </div>
                </div>
                <button
                  class="btn btn-ghost btn-xs"
                  @click="profileStore.removeShow(show.tmdb_id, authStore.user?.id)"
                  title="Remove from list"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Watching -->
        <div class="card bg-base-100 shadow-lg">
          <div class="card-body">
            <h2 class="card-title text-info text-lg">📺 Watching ({{ profileStore.watchingCount }})</h2>
            <div v-if="profileStore.showsByStatus('watching').length === 0" class="opacity-70 text-sm">
              No shows being watched yet.
            </div>
            <div v-else class="space-y-2">
              <div
                v-for="show in profileStore.showsByStatus('watching')"
                :key="show.tmdb_id"
                class="flex items-center justify-between p-2 bg-base-200 rounded hover:bg-base-300 transition"
              >
                <div class="flex-1">
                  <p class="text-sm font-medium">{{ show.name }}</p>
                  <div class="flex gap-1 mt-1">
                    <span v-if="show.is_favourite" class="badge badge-warning badge-sm">⭐ Fav</span>
                  </div>
                </div>
                <button
                  class="btn btn-ghost btn-xs"
                  @click="profileStore.removeShow(show.tmdb_id, authStore.user?.id)"
                  title="Remove from list"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Watched -->
        <div class="card bg-base-100 shadow-lg">
          <div class="card-body">
            <h2 class="card-title text-success text-lg">✅ Watched ({{ profileStore.watchedCount }})</h2>
            <div v-if="profileStore.showsByStatus('watched').length === 0" class="opacity-70 text-sm">
              No watched shows yet.
            </div>
            <div v-else class="space-y-2">
              <div
                v-for="show in profileStore.showsByStatus('watched')"
                :key="show.tmdb_id"
                class="flex items-center justify-between p-2 bg-base-200 rounded hover:bg-base-300 transition"
              >
                <div class="flex-1">
                  <p class="text-sm font-medium">{{ show.name }}</p>
                  <div class="flex gap-1 mt-1">
                    <span v-if="show.is_favourite" class="badge badge-warning badge-sm">⭐ Fav</span>
                  </div>
                </div>
                <button
                  class="btn btn-ghost btn-xs"
                  @click="profileStore.removeShow(show.tmdb_id, authStore.user?.id)"
                  title="Remove from list"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Dropped -->
        <div class="card bg-base-100 shadow-lg">
          <div class="card-body">
            <h2 class="card-title text-error text-lg">❌ Dropped ({{ profileStore.droppedCount }})</h2>
            <div v-if="profileStore.showsByStatus('dropped').length === 0" class="opacity-70 text-sm">
              No dropped shows.
            </div>
            <div v-else class="space-y-2">
              <div
                v-for="show in profileStore.showsByStatus('dropped')"
                :key="show.tmdb_id"
                class="flex items-center justify-between p-2 bg-base-200 rounded hover:bg-base-300 transition"
              >
                <div class="flex-1">
                  <p class="text-sm font-medium">{{ show.name }}</p>
                  <div class="flex gap-1 mt-1">
                    <span v-if="show.is_favourite" class="badge badge-warning badge-sm">⭐ Fav</span>
                  </div>
                </div>
                <button
                  class="btn btn-ghost btn-xs"
                  @click="profileStore.removeShow(show.tmdb_id, authStore.user?.id)"
                  title="Remove from list"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Favourites -->
        <div class="card bg-base-100 shadow-lg md:col-span-2 lg:col-span-1">
          <div class="card-body">
            <h2 class="card-title text-warning text-lg">⭐ All Favourites ({{ profileStore.favouriteCount }})</h2>
            <div v-if="profileStore.favouriteShows.length === 0" class="opacity-70 text-sm">
              No favourite shows yet.
            </div>
            <div v-else class="space-y-2">
              <div
                v-for="show in profileStore.favouriteShows"
                :key="show.tmdb_id"
                class="flex items-center justify-between p-2 bg-base-200 rounded hover:bg-base-300 transition"
              >
                <div class="flex-1">
                  <p class="text-sm font-medium">{{ show.name }}</p>
                  <span :class="['badge badge-sm', statusConfig[show.status].color]">
                    {{ statusConfig[show.status].emoji }} {{ statusConfig[show.status].label }}
                  </span>
                </div>
                <button
                  class="btn btn-ghost btn-xs"
                  @click="profileStore.removeShow(show.tmdb_id, authStore.user?.id)"
                  title="Remove from list"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
