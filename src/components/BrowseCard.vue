<script>
import { fetchGenres } from '@/stores/tmdb'
import GenreBadge from './GenreBadge.vue'

export default {
  components: {
    GenreBadge,
  },
  props: {
    id: Number,
    title: String,
    image: String,
    tags: Array,
    rating: Number,
    lastInRow: Boolean,
  },
  data() {
    return {
      genreMap: {},
    }
  },
  computed: {
    genreNames() {
      return this.tags.map((id) => this.genreMap[id] || 'Unknown')
    },
  },
  async mounted() {
    const genres = await fetchGenres()
    genres.forEach((genre) => {
      this.genreMap[genre.id] = genre.name
    })
  },
}
</script>

<template>
  <div :class="['tooltip', lastInRow ? 'tooltip-left' : 'tooltip-right']">
    <div class="tooltip-content -mt-20 min-w-64 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 transition-colors duration-300 rounded-lg shadow-xl overflow-hidden">
      <div class="flex flex-col p-4">
        <div class="flex justify-center gap-2 text-xl text-gray-900 dark:text-white font-semibold">
          Rating: {{ rating.toFixed(1) }}
          <span class="text-xl">{{ rating < 5 ? '😠' : rating < 7 ? '😐' : '😊' }}</span>
        </div>
        <div class="text-sm text-gray-700 dark:text-gray-300 mt-2">Tags:</div>
        <div class="flex gap-2 mt-2 flex-wrap justify-center">
          <GenreBadge v-for="(genre, idx) in genreNames" :key="idx" :genre="genre" />
        </div>
      </div>
    </div>
    <RouterLink :to="{ name: 'ShowDetailView', params: { id } }">
      <div class="card bg-gray-100 dark:bg-slate-800 w-44 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden">
        <figure class="h-60 overflow-hidden">
          <img :src="image" class="w-full h-full object-cover" :alt="title" />
        </figure>
        <div class="card-body p-2 text-center">
          <h2 class="card-title text-sm text-gray-900 dark:text-white line-clamp-2">{{ title }}</h2>
        </div>
      </div>
    </RouterLink>
  </div>
</template>
