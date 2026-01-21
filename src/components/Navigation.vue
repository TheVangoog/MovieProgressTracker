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
      authStore: useAuthStore(),
      mobileMenuOpen: false
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
      this.mobileMenuOpen = false
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
    }
  }
})
</script>

<template>
  <nav class="navbar bg-white dark:bg-slate-900 shadow-md sticky top-0 z-40 transition-colors duration-300">
    <!-- Logo -->
    <div class="navbar-start">
      <RouterLink to="/" class="btn btn-ghost text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
        🎬 <span class="hidden sm:inline">FilmProject</span>
      </RouterLink>
    </div>

    <!-- Center Links (visible on larger screens) -->
    <div class="navbar-center hidden lg:flex gap-4">
      <RouterLink to="/" class="btn btn-ghost btn-sm text-gray-700 dark:text-gray-300">Home</RouterLink>
      <RouterLink to="/browse" class="btn btn-ghost btn-sm text-gray-700 dark:text-gray-300">Browse</RouterLink>
      <RouterLink to="/feedback" class="btn btn-ghost btn-sm text-gray-700 dark:text-gray-300">Feedback</RouterLink>
    </div>

    <!-- Right side: Dark Mode + Auth + Mobile Menu -->
    <div class="navbar-end gap-2">
      <!-- Dark Mode Toggle -->
      <button
        @click="toggleDark()"
        class="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        :class="isDark ? 'bg-purple-600' : 'bg-gray-300'"
        aria-label="Toggle dark mode"
      >
        <span
          class="inline-block w-4 h-4 transform transition-transform bg-white rounded-full"
          :class="isDark ? 'translate-x-6' : 'translate-x-1'"
        ></span>
      </button>

      <!-- Desktop Auth Dropdown (hidden on mobile) -->
      <div class="dropdown dropdown-end hidden sm:block">
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            ></path>
          </svg>
          <span v-if="authStore.isAuthenticated">{{ username }}</span>
          <span v-else>Sign In</span>
        </button>

        <ul class="dropdown-content z-50 menu p-3 shadow bg-white dark:bg-slate-800 rounded-lg w-56 border border-gray-200 dark:border-slate-700">
          <li v-if="authStore.isAuthenticated" class="menu-title">
            <span class="text-gray-700 dark:text-gray-300 text-xs">{{ userEmail }}</span>
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

      <!-- Mobile Hamburger Menu (visible on mobile only) -->
      <button
        @click="toggleMobileMenu"
        class="btn btn-ghost btn-sm sm:hidden text-gray-700 dark:text-gray-300"
        aria-label="Toggle menu"
      >
        <svg
          v-if="!mobileMenuOpen"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="w-6 h-6 stroke-current"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="w-6 h-6 stroke-current"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  </nav>

  <!-- Mobile Menu Dropdown -->
  <Transition name="slide-fade">
    <div
      v-if="mobileMenuOpen"
      class="sm:hidden bg-white dark:bg-slate-800 shadow-lg border-b border-gray-200 dark:border-slate-700 transition-all duration-300"
    >
      <div class="px-4 py-3 space-y-2">
        <!-- User Info (if authenticated) -->
        <div v-if="authStore.isAuthenticated" class="pb-3 mb-3 border-b border-gray-200 dark:border-slate-600">
          <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ username }}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ userEmail }}</p>
        </div>

        <!-- Navigation Links -->
        <RouterLink
          to="/"
          @click="closeMobileMenu"
          class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          🏠 Home
        </RouterLink>
        <RouterLink
          to="/browse"
          @click="closeMobileMenu"
          class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          📺 Browse
        </RouterLink>
        <RouterLink
          to="/feedback"
          @click="closeMobileMenu"
          class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          💬 Feedback
        </RouterLink>

        <!-- Auth Links -->
        <div v-if="authStore.isAuthenticated" class="pt-3 border-t border-gray-200 dark:border-slate-600 space-y-2">
          <RouterLink
            to="/profile"
            @click="closeMobileMenu"
            class="block px-4 py-2 text-info hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            👤 My Profile
          </RouterLink>
          <button
            @click="logout"
            class="w-full text-left px-4 py-2 text-error hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            🚪 Logout
          </button>
        </div>
        <div v-else class="pt-3 border-t border-gray-200 dark:border-slate-600">
          <RouterLink
            to="/auth"
            @click="closeMobileMenu"
            class="block px-4 py-2 text-success font-semibold hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            🔑 Sign In
          </RouterLink>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Mobile Menu Animation */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
