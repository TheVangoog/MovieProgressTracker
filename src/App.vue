<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from './stores/auth'
import Navigation from './components/Navigation.vue'
import AppFooter from './components/AppFooter.vue'

export default defineComponent({
  components: {
    Navigation,
    AppFooter,
  },
  data() {
    return {
      authStore: useAuthStore(),
    }
  },
  mounted() {
    this.authStore.initialize()
  },
})
</script>

<template>
  <Navigation />
  <RouterView />
  <AppFooter />
</template>

<style scoped></style>
