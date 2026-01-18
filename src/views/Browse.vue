<script setup lang="ts">
import { ref, computed } from "vue";
import BrowseCategory from "@/components/BrowseCategory.vue";
import { buildTrendingTvEndpoint, buildPopularTvEndpoint, buildSearchTvEndpoint } from "@/stores/tmdb";

const searchQuery = ref("");

const searchEndpoint = computed(() => buildSearchTvEndpoint(searchQuery.value));
</script>

<template>
  <main class="p-4 min-h-screen">


    <div class="flex gap-2 mb-6">
      <input
        v-model="searchQuery"
        placeholder="Search TV show..."
        class="input input-bordered flex-1"
      />
      <button class="btn btn-primary" disabled>
        Search
      </button>
    </div>

    <BrowseCategory
      title="Search Results"
      :endpoint="searchEndpoint"
      v-if="searchQuery.trim() !== ''"
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
