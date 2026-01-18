<script>
import BrowseCard from "./BrowseCard.vue";
import { fetchListFromEndpoint } from "@/stores/tmdb";

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
    };
  },

  computed: {
    visibleItems() {
      return this.items.slice(0, this.visibleCount);
    }
  },

  methods: {
    async load(force = false) {
      if (!this.endpoint) return;
      if (force) {
        this.items = [];
        this.page = 1;
        this.canLoadMore = true;
      }
      if (!this.canLoadMore || this.loading) return;

      this.loading = true;
      try {
        const url = this.endpoint + (this.endpoint.includes('?') ? '&' : '?') + `page=${this.page}`;
        const list = await fetchListFromEndpoint(url);
        if (!list.length) {
          this.canLoadMore = false;
        } else {
          this.items = this.items.concat(list);
          this.page += 1;
        }
      } finally {
        this.loading = false;
      }
    },
    showMore() {
      this.visibleCount += 6;
      if (this.visibleCount >= this.items.length && this.canLoadMore && !this.loading) {
        this.load();
      }
    }
  },

  watch: {
    endpoint: {
      immediate: true,
      handler() {
        if (this.endpoint) this.load(true);
      }
    }
  }
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">{{ title }}</h2>

    <div class="grid gap-4 
                grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      <BrowseCard
        v-for="item in visibleItems"
        :key="item.id"
        :id="item.id"
        :title="item.name"
        :image="item.image"
      />
    </div>

    <button
      v-if="visibleCount < items.length"
      class="btn btn-primary mt-4"
      @click="showMore"
    >
      Show more
    </button>
  </div>
</template>

<style scoped></style>
