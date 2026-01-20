<script>
export default {
  name: 'GenreBadge',
  props: {
    genre: {
      type: String,
      required: true,
    },
  },
}
</script>

<template>
  <div class="badge badge-warning">
    {{ genre }}
  </div>
</template>


