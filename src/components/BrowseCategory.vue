<script>
import BrowseCard from './BrowseCard.vue'
import { fetchListFromEndpoint } from '@/stores/tmdb'

export default {
  components: { BrowseCard },

  props: {
    title: String,
    endpoint: String,
  },

  data() {
    return {
      items: [],
      visibleCount: 6,
      page: 1,
      canLoadMore: true,
      loading: false,
    }
  },

  computed: {
    visibleItems() {
      return this.items.slice(0, this.visibleCount)
    },
  },

  methods: {
    async load(force = false) {
      if (!this.endpoint) return
      if (force) {
        this.items = []
        this.page = 1
        this.canLoadMore = true
      }
      if (!this.canLoadMore || this.loading) return

      this.loading = true
      try {
        const url = this.endpoint + (this.endpoint.includes('?') ? '&' : '?') + `page=${this.page}`
        const list = await fetchListFromEndpoint(url)
        if (!list.length) {
          this.canLoadMore = false
        } else {
          this.items = this.items.concat(list)
          this.page += 1
        }
      } finally {
        this.loading = false
      }
    },
    showMore() {
      this.visibleCount += 6
      if (this.visibleCount >= this.items.length && this.canLoadMore && !this.loading) {
        this.load()
      }
    },
  },

  watch: {
    endpoint: {
      immediate: true,
      handler() {
        if (this.endpoint) this.load(true)
      },
    },
  },
}
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{{ title }}</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 justify-items-center">
      <BrowseCard
        v-for="item in visibleItems"
        :key="item.id"
        :id="item.id"
        :title="item.name"
        :image="item.image"
        :tags="item.tags"
        :rating="item.rating"
        :lastInRow="(visibleItems.indexOf(item) + 1) % 6 === 0"
      />
    </div>

    <!-- Show More Button -->
    <div v-if="visibleCount < items.length || loading" class="flex justify-center mt-6">
      <button
        class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        @click="showMore"
        :disabled="loading"
      >
        <span v-if="!loading">Show more</span>
        <span v-else class="flex items-center gap-2">
          <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
