<template>
  <footer class="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 py-8 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4">

      <!-- Divider -->
      <div class="flex justify-center mb-6">
        <div class="w-32 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
      </div>

      <!-- Project Info -->
      <div class="text-center mb-4">
        <p class="text-gray-700 dark:text-gray-300 font-semibold text-lg">
          🎬 FilmProject
        </p>
        <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Frontendove Technologie
        </p>
      </div>

      <!-- Copyright -->
      <div class="text-center">
        <p class="text-gray-600 dark:text-gray-400 text-sm">
          {{ new Date().getFullYear() }} © <strong class="text-gray-900 dark:text-white">Ivan Timoshkin</strong>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>
