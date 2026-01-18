<script>
export default {
  props: {
    id: Number,
    title: String,
    image: String
  }
};
</script>

<template>
  <RouterLink :to="{ name: 'ShowDetailView', params: { id } }">
    <div class="card bg-none w-44 shadow-sm cursor-pointer">
      <figure class="h-60 overflow-hidden">
        <img :src="image" class="w-full h-full object-cover" :alt="title" />
      </figure>
      <div class="card-body p-1 text-center">
        <h2 class="card-title text-sm text-white">{{ title }}</h2>
      </div>
    </div>
  </RouterLink>
</template>
