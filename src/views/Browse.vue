<script setup lang="ts">
import { ref, computed } from "vue";
import BrowseCategory from "@/components/BrowseCategory.vue";
import { buildTrendingTvEndpoint, buildPopularTvEndpoint, buildSearchTvEndpoint } from "@/stores/tmdb";

const searchQuery = ref("");

const searchEndpoint = computed(() => buildSearchTvEndpoint(searchQuery.value));
</script>

<template>
  <main class="p-4 min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
    <!-- Search Bar -->
    <div class="flex gap-2 mb-6">
      <input
        v-model="searchQuery"
        placeholder="Search TV show..."
        class="input input-bordered flex-1 bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-purple-500 dark:focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
      />
      <button
        class="btn bg-purple-600 hover:bg-purple-700 text-white border-none disabled:bg-gray-400 dark:disabled:bg-slate-700 disabled:text-gray-600 dark:disabled:text-gray-500 transition-all"
        disabled
      >
        Search
      </button>
    </div>

    <!-- Search Results -->
    <BrowseCategory
      v-if="searchQuery.trim() !== ''"
      title="Search Results"
      :endpoint="searchEndpoint"
    />

    <!-- Trending -->
    <BrowseCategory
      title="Trending"
      :endpoint="buildTrendingTvEndpoint()"
    />

    <!-- Popular -->
    <BrowseCategory
      title="Popular"
      :endpoint="buildPopularTvEndpoint()"
    />
  </main>
</template>
