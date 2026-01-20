<script>
import CustomInput from '@/components/CustomInput.vue'
import TextArea from '@/components/TextArea.vue'

export default {
  name: 'FeedbackView',
  components: {
    CustomInput,
    TextArea
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-900 py-16 px-4">
    <div class="max-w-3xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12 animate-fade-in">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
          Send Us Your
          <span class="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Feedback
          </span>
        </h1>
        <p class="text-lg text-slate-300">
          We'd love to hear from you! Share your thoughts, suggestions, or report any issues.
        </p>
      </div>

      <!-- Feedback Form -->
      <div class="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700 animate-slide-up">
        <form class="space-y-6">
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
            <label class="block text-slate-300 text-sm font-semibold mb-2">Rating</label>
            <v-rating
              hover
              :length="5"
              :size="32"
              :model-value="3"
              active-color="primary"
            />
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
        <div class="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center hover:border-purple-500 transition-all duration-300">
          <div class="text-4xl mb-3">📧</div>
          <h3 class="text-white font-semibold mb-2">Email Us</h3>
          <p class="text-slate-400 text-sm">support@filmproject.com</p>
        </div>

        <div class="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center hover:border-purple-500 transition-all duration-300">
          <div class="text-4xl mb-3">💬</div>
          <h3 class="text-white font-semibold mb-2">Live Chat</h3>
          <p class="text-slate-400 text-sm">Available 24/7</p>
        </div>

        <div class="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center hover:border-purple-500 transition-all duration-300">
          <div class="text-4xl mb-3">📱</div>
          <h3 class="text-white font-semibold mb-2">Social Media</h3>
          <p class="text-slate-400 text-sm">@filmproject</p>
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
