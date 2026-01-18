<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useToggle } from '@vueuse/core'

const [isDark, toggleDark] = useToggle(false)

export default defineComponent({
  name: 'Navigation',
  data() {
    return {
      authStore: useAuthStore(),
      isDark,
      toggleDarkMode: toggleDark
    }
  },
  computed: {
    userEmail() {
      return this.authStore.user?.email || ''
    },
    username() {
      const email = this.userEmail
      return email.split('@')[0] || 'User'
    }
  },
  methods: {
    async logout() {
      await this.authStore.signOut()
    }
  }
})
</script>

<template>
  <nav class="navbar bg-base-100 shadow-md sticky top-0 z-40">
    <!-- Logo -->
    <div class="navbar-start">
      <RouterLink to="/" class="btn btn-ghost text-2xl font-bold">🎬 FilmProject</RouterLink>
    </div>

    <!-- Center Links (visible on larger screens) -->
    <div class="navbar-center hidden lg:flex gap-4">
      <RouterLink to="/browse" class="btn btn-ghost btn-sm">Browse</RouterLink>
      <RouterLink to="/" class="btn btn-ghost btn-sm">Home</RouterLink>
    </div>

    <!-- Right side: Dark Mode + Auth -->
    <div class="navbar-end gap-2">
      <!-- Dark Mode Toggle -->
      <button 
        class="btn btn-circle btn-ghost btn-sm"
        @click="toggleDarkMode()"
        title="Toggle dark mode"
      >
        <svg
          v-if="isDark"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M21.64 15.95c-.18-.8-.46-1.58-.84-2.31.58-1.25.82-2.82.5-4.47-.32-1.65-1.27-3.12-2.61-4.05-.34-.23-.77-.27-1.17-.12-.4.15-.64.46-.63.84 0 .38.16.70.45.88 1.13.7 1.87 1.91 1.87 3.38 0 1.47-.74 2.68-1.87 3.38-.29.18-.45.5-.45.88 0 .38.23.69.63.84.4.15.83.11 1.17-.12 1.34-.93 2.29-2.4 2.61-4.05.32-1.65.08-3.22-.5-4.47.38-.73.66-1.51.84-2.31.05-.22 0-.45-.13-.64-.13-.2-.33-.34-.56-.37-1.97-.2-3.9.88-5.05 2.76-1.15-1.88-3.08-2.96-5.05-2.76-.23.03-.43.17-.56.37-.13.19-.18.42-.13.64.18.8.46 1.58.84 2.31-.58 1.25-.82 2.82-.5 4.47.32 1.65 1.27 3.12 2.61 4.05.34.23.77.27 1.17.12.4-.15.64-.46.63-.84 0-.38-.16-.7-.45-.88-1.13-.7-1.87-1.91-1.87-3.38 0-1.47.74-2.68 1.87-3.38.29-.18.45-.5.45-.88 0-.38-.23-.69-.63-.84-.4-.15-.83-.11-1.17.12-1.34.93-2.29 2.4-2.61 4.05-.32 1.65-.08 3.22.5 4.47-.38.73-.66 1.51-.84 2.31-.05.22 0 .45.13.64.13.2.33.34.56.37 1.97.2 3.9-.88 5.05-2.76 1.15 1.88 3.08 2.96 5.05 2.76.23-.03.43-.17.56-.37.13-.19.18-.42.13-.64z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </button>

      <!-- Auth Dropdown -->
      <div class="dropdown dropdown-end">
        <button class="btn btn-ghost btn-sm gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="w-5 h-5 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span v-if="authStore.isAuthenticated" class="hidden sm:inline">{{ username }}</span>
          <span v-else class="hidden sm:inline">Sign In</span>
        </button>

        <ul
          class="dropdown-content z-50 menu p-3 shadow bg-base-100 rounded-lg w-56"
        >
          <li v-if="authStore.isAuthenticated" class="menu-title">
            <span>{{ userEmail }}</span>
          </li>
          <li v-if="authStore.isAuthenticated">
            <RouterLink to="/profile" class="text-info">👤 My Profile</RouterLink>
          </li>
          <li v-if="authStore.isAuthenticated">
            <RouterLink to="/browse" class="text-primary">📺 Browse Shows</RouterLink>
          </li>
          <li v-if="authStore.isAuthenticated" class="border-t border-base-300 pt-2 mt-2">
            <button @click="logout" class="text-error">🚪 Logout</button>
          </li>
          <li v-if="!authStore.isAuthenticated">
            <RouterLink to="/auth" class="text-success font-semibold">🔑 Sign In</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
