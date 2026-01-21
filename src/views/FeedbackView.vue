<script lang="ts">
import { defineComponent } from 'vue'
import CustomInput from '@/components/CustomInput.vue'
import TextArea from '@/components/TextArea.vue'

export default defineComponent({
  name: 'FeedbackView',
  components: {
    CustomInput,
    TextArea
  },
  data() {
    return {
      rating: 3,
      hoveredRating: 0
    }
  },
  methods: {
    setRating(value: number) {
      this.rating = value
    },
    setHoveredRating(value: number) {
      this.hoveredRating = value
    }
  }
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-slate-900 py-16 px-4 transition-colors duration-300">
    <div class="max-w-3xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12 animate-fade-in">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Send Us Your
          <span class="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Feedback
          </span>
        </h1>
        <p class="text-lg text-gray-600 dark:text-slate-300">
          We'd love to hear from you! Share your thoughts, suggestions, or report any issues.
        </p>
      </div>

      <!-- Feedback Form -->
      <div class="bg-gray-50 dark:bg-slate-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-slate-700 animate-slide-up transition-colors duration-300">
        <form class="space-y-6" @submit.prevent>
          <!-- Name Input -->
          <CustomInput
            label="Your Name"
            type="text"
            placeholder="John Doe"
          />

          <!-- Email Input -->
          <CustomInput
            label="Email Address"
            type="email"
            placeholder="john@example.com"
          />

          <!-- Subject Input -->
          <CustomInput
            label="Subject"
            type="text"
            placeholder="What is your feedback about?"
          />

          <!-- Rating -->
          <div>
            <label class="block text-gray-700 dark:text-slate-300 text-sm font-semibold mb-2">Rating</label>
            <div class="flex gap-2">
              <button
                v-for="star in 5"
                :key="star"
                type="button"
                @click="setRating(star)"
                @mouseenter="setHoveredRating(star)"
                @mouseleave="setHoveredRating(0)"
                class="transition-all duration-200 focus:outline-none focus:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  :class="[
                    'w-8 h-8 transition-colors duration-200',
                    (hoveredRating > 0 ? star <= hoveredRating : star <= rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-none text-gray-300 dark:text-slate-600'
                  ]"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </button>
            </div>
            <p class="text-sm text-gray-500 dark:text-slate-400 mt-2">{{ rating }} out of 5 stars</p>
          </div>

          <!-- Message TextArea -->
          <TextArea
            label="Your Message"
            :rows="6"
            placeholder="Tell us what you think..."
          />

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Send Feedback
          </button>
        </form>
      </div>

      <!-- Info Cards -->
      <div class="grid md:grid-cols-3 gap-6 mt-12">
        <div class="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 text-center hover:border-purple-500 transition-all duration-300">
          <div class="text-4xl mb-3">📧</div>
          <h3 class="text-gray-900 dark:text-white font-semibold mb-2">Email Us</h3>
          <p class="text-gray-600 dark:text-slate-400 text-sm">support@filmproject.com</p>
        </div>

        <div class="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 text-center hover:border-purple-500 transition-all duration-300">
          <div class="text-4xl mb-3">💬</div>
          <h3 class="text-gray-900 dark:text-white font-semibold mb-2">Live Chat</h3>
          <p class="text-gray-600 dark:text-slate-400 text-sm">Available 24/7</p>
        </div>

        <div class="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 text-center hover:border-purple-500 transition-all duration-300">
          <div class="text-4xl mb-3">📱</div>
          <h3 class="text-gray-900 dark:text-white font-semibold mb-2">Social Media</h3>
          <p class="text-gray-600 dark:text-slate-400 text-sm">@filmproject</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out 0.2s both;
}
</style>
