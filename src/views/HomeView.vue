<template>
  <section class="bg-white dark:bg-slate-900 min-h-[90vh] flex items-center justify-between px-8 md:px-16 lg:px-24 py-12 md:py-16 lg:py-20 gap-12 lg:gap-20 overflow-hidden transition-colors duration-300">
    <!-- Hero Content -->
    <div class="flex-1 text-gray-900 dark:text-white space-y-6 animate-fade-in-left">
      <div class="inline-block">
        <span class="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-sm font-semibold tracking-wide uppercase animate-pulse-glow text-white">
          Track Your Movies
        </span>
      </div>

      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
        Your Personal
        <span class="block mt-2 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
          Movie Library
        </span>
      </h1>

      <p class="text-base md:text-lg text-gray-600 dark:text-slate-300 max-w-xl leading-relaxed">
        Discover, track, and organize your favorite films. Never forget what to watch next with smart recommendations and personalized lists.
      </p>

      <div class="flex flex-wrap gap-4 pt-2">
        <button class="group px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 active:scale-95">
          Get Started
          <span class="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>

        <button class="px-6 py-3 bg-gray-200 dark:bg-slate-800 rounded-lg font-semibold text-gray-900 dark:text-white border border-gray-300 dark:border-slate-700 transition-all duration-300 hover:bg-gray-300 dark:hover:bg-slate-700 hover:border-gray-400 dark:hover:border-slate-600 hover:scale-105 active:scale-95">
          Learn More
        </button>
      </div>

      <!-- Stats -->
      <div class="flex gap-8 pt-4">
        <div class="space-y-1">
          <div class="text-2xl font-bold text-gray-900 dark:text-white">10K+</div>
          <div class="text-xs text-gray-500 dark:text-slate-400">Movies</div>
        </div>
        <div class="space-y-1">
          <div class="text-2xl font-bold text-gray-900 dark:text-white">5K+</div>
          <div class="text-xs text-gray-500 dark:text-slate-400">Users</div>
        </div>
        <div class="space-y-1">
          <div class="text-2xl font-bold text-gray-900 dark:text-white">4.9</div>
          <div class="text-xs text-gray-500 dark:text-slate-400">Rating</div>
        </div>
      </div>
    </div>

    <!-- Phone Preview -->
    <div class="hidden lg:flex flex-1 justify-center items-center animate-fade-in-right max-w-sm">
      <div class="relative scale-90">
        <!-- Glow effect behind phone -->
        <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-3xl opacity-30 animate-pulse-slow"></div>

        <!-- Phone mockup -->
        <div class="relative z-10 transform hover:scale-105 transition-transform duration-500">
          <div class="w-64 h-[500px] bg-gray-200 dark:bg-slate-800 rounded-[2.5rem] border-8 border-gray-300 dark:border-slate-700 shadow-2xl overflow-hidden transition-colors duration-300">
            <!-- Phone screen -->
            <div class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-900 dark:to-slate-800 p-6 flex flex-col items-center justify-center transition-colors duration-300">
              <div class="text-6xl mb-4 animate-pulse-slow">🎬</div>
              <div class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">FilmProject</div>
            </div>
          </div>
        </div>

        <!-- Floating elements -->
        <div class="absolute -top-8 -left-8 w-20 h-20 bg-purple-500 rounded-full blur-xl opacity-50 animate-float"></div>
        <div class="absolute -bottom-8 -right-8 w-24 h-24 bg-pink-500 rounded-full blur-xl opacity-50 animate-float-delayed"></div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView'
})
</script>

<style scoped>
@keyframes fade-in-left {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-in-right {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
  }
  50% {
    box-shadow: 0 0 30px rgba(168, 85, 247, 0.6);
  }
}

@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-delayed {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

.animate-fade-in-left {
  animation: fade-in-left 0.8s ease-out;
}

.animate-fade-in-right {
  animation: fade-in-right 0.8s ease-out 0.2s both;
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
}

@media (max-width: 1024px) {
  section {
    flex-direction: column;
    text-align: center;
  }

  .animate-fade-in-left,
  .animate-fade-in-right {
    animation: none;
  }
}
</style>
