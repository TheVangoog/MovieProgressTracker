<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useDark, useToggle } from '@vueuse/core'

export default defineComponent({
  name: 'Navigation',
  setup() {
    const isDark = useDark({
      selector: 'html',
      attribute: 'class',
      valueDark: 'dark',
      valueLight: '',
      storageKey: 'filmproject-theme',
      initialValue: 'dark'
    })

    const toggleDark = useToggle(isDark)

    return {
      isDark,
      toggleDark
    }
  },
  data() {
    return {
      authStore: useAuthStore()
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
  <nav class="navbar bg-white dark:bg-slate-900 shadow-md sticky top-0 z-40 transition-colors duration-300">
    <!-- Logo -->
    <div class="navbar-start">
      <RouterLink to="/" class="btn btn-ghost text-2xl font-bold text-gray-900 dark:text-white">🎬 FilmProject</RouterLink>
    </div>

    <!-- Center Links (visible on larger screens) -->
    <div class="navbar-center hidden lg:flex gap-4">
      <RouterLink to="/" class="btn btn-ghost btn-sm text-gray-700 dark:text-gray-300">Home</RouterLink>
      <RouterLink to="/browse" class="btn btn-ghost btn-sm text-gray-700 dark:text-gray-300">Browse</RouterLink>
      <RouterLink to="/feedback" class="btn btn-ghost btn-sm text-gray-700 dark:text-gray-300">Feedback</RouterLink>
    </div>

    <!-- Right side: Dark Mode + Auth -->
    <div class="navbar-end gap-2">
      <!-- Dark Mode Toggle - Custom HTML/CSS -->
      <button
        @click="toggleDark()"
        class="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        :class="isDark ? 'bg-purple-600' : 'bg-gray-300'"
      >
        <span
          class="inline-block w-4 h-4 transform transition-transform bg-white rounded-full"
          :class="isDark ? 'translate-x-6' : 'translate-x-1'"
        ></span>
      </button>

      <!-- Auth Dropdown -->
      <div class="dropdown dropdown-end">
        <button class="btn btn-ghost btn-sm gap-2 text-gray-700 dark:text-gray-300">
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
          class="dropdown-content z-50 menu p-3 shadow bg-white dark:bg-slate-800 rounded-lg w-56 border border-gray-200 dark:border-slate-700"
        >
          <li v-if="authStore.isAuthenticated" class="menu-title">
            <span class="text-gray-700 dark:text-gray-300">{{ userEmail }}</span>
          </li>
          <li v-if="authStore.isAuthenticated">
            <RouterLink to="/profile" class="text-info hover:bg-gray-100 dark:hover:bg-slate-700">👤 My Profile</RouterLink>
          </li>
          <li v-if="authStore.isAuthenticated">
            <RouterLink to="/browse" class="text-primary hover:bg-gray-100 dark:hover:bg-slate-700">📺 Browse Shows</RouterLink>
          </li>
          <li v-if="authStore.isAuthenticated" class="border-t border-gray-200 dark:border-slate-600 pt-2 mt-2">
            <button @click="logout" class="text-error hover:bg-gray-100 dark:hover:bg-slate-700">🚪 Logout</button>
          </li>
          <li v-if="!authStore.isAuthenticated">
            <RouterLink to="/auth" class="text-success font-semibold hover:bg-gray-100 dark:hover:bg-slate-700">🔑 Sign In</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
