<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from './stores/auth'
import Navigation from './components/Navigation.vue'

export default defineComponent({
  components: {
    Navigation
  },
  data() {
    return {
      authStore: useAuthStore()
    }
  },
  mounted() {
    this.authStore.initialize()
  }
})
</script>

<template>
  <Navigation/>
  <RouterView/>
</template>

<style scoped>

</style>
