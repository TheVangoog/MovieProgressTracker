<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'AuthView',
  data() {
    return {
      authStore: useAuthStore(),
      router: useRouter(),
      isLogin: true,
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      errorMessage: '',
      successMessage: ''
    }
  },
  methods: {
    toggleMode() {
      this.isLogin = !this.isLogin
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
      this.username = ''
      this.errorMessage = ''
      this.successMessage = ''
    },
    async handleSubmit() {
      this.errorMessage = ''
      this.successMessage = ''

      console.log('Form submitted:', { isLogin: this.isLogin, email: this.email })

      if (!this.email || !this.password) {
        this.errorMessage = 'Email and password are required'
        return
      }

      if (!this.isLogin) {
        if (this.password !== this.confirmPassword) {
          this.errorMessage = 'Passwords do not match'
          return
        }
        if (this.password.length < 6) {
          this.errorMessage = 'Password must be at least 6 characters'
          return
        }
      }

      console.log('Validation passed, calling auth store...')

      if (this.isLogin) {
        console.log('Attempting login...')
        const result = await this.authStore.signIn(this.email, this.password)
        console.log('Login result:', result)
        if (result.success) {
          this.successMessage = 'Login successful! Redirecting...'
          setTimeout(() => this.router.push('/'), 1000)
        } else {
          if (result.error?.includes('Invalid login credentials')) {
            this.errorMessage = 'Invalid email or password. Please check your credentials or sign up.'
          } else if (result.error?.includes('Email not confirmed')) {
            this.errorMessage = 'Please check your email and confirm your account first.'
          } else {
            this.errorMessage = result.error || 'Login failed'
          }
        }
      } else {
        console.log('Attempting signup...')
        const result = await this.authStore.signUp(this.email, this.password, this.username)
        console.log('Signup result:', result)
        if (result.success) {
          this.successMessage = 'Account created! Please check your email to confirm.'
          setTimeout(() => {
            this.isLogin = true
            this.email = ''
            this.password = ''
            this.confirmPassword = ''
            this.username = ''
            this.successMessage = ''
          }, 3000)
        } else {
          this.errorMessage = result.error || 'Registration failed'
        }
      }
    }
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 px-4">
    <div class="card w-full max-w-md bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-3xl font-bold justify-center mb-6">
          {{ isLogin ? 'Welcome Back' : 'Create Account' }}
        </h2>

        <!-- Error/Success Messages -->
        <div v-if="errorMessage" class="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ errorMessage }}</span>
        </div>

        <div v-if="successMessage" class="alert alert-success">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ successMessage }}</span>
        </div>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Username (Register only) -->
          <div v-if="!isLogin" class="form-control">
            <label class="label">
              <span class="label-text">Username</span>
            </label>
            <input 
              v-model="username"
              type="text" 
              placeholder="Enter your username" 
              class="input input-bordered w-full"
              required
            />
          </div>

          <!-- Email -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input 
              v-model="email"
              type="email" 
              placeholder="Enter your email" 
              class="input input-bordered w-full"
              required
            />
          </div>

          <!-- Password -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input 
              v-model="password"
              type="password" 
              placeholder="Enter your password" 
              class="input input-bordered w-full"
              required
            />
            <label v-if="isLogin" class="label">
              <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>

          <!-- Confirm Password (Register only) -->
          <div v-if="!isLogin" class="form-control">
            <label class="label">
              <span class="label-text">Confirm Password</span>
            </label>
            <input 
              v-model="confirmPassword"
              type="password" 
              placeholder="Confirm your password" 
              class="input input-bordered w-full"
              required
            />
          </div>

          <!-- Submit Button -->
          <div class="form-control mt-6">
            <button 
              type="submit" 
              class="btn btn-primary w-full"
              :disabled="authStore.loading"
            >
              <span v-if="authStore.loading" class="loading loading-spinner"></span>
              {{ authStore.loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up') }}
            </button>
          </div>
        </form>
          <!-- Username (Register only) -->
          <div v-if="!isLogin" class="form-control">
            <label class="label">
              <span class="label-text">Username</span>
            </label>
            <input 
              v-model="username"
              type="text" 
              placeholder="Enter your username" 
              class="input input-bordered w-full"
              required
            />
          </div>

          <!-- Email -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input 
              v-model="email"
              type="email" 
              placeholder="Enter your email" 
              class="input input-bordered w-full"
              required
            />
          </div>

          <!-- Password -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input 
              v-model="password"
              type="password" 
              placeholder="Enter your password" 
              class="input input-bordered w-full"
              required
            />
            <label v-if="isLogin" class="label">
              <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>

          <!-- Confirm Password (Register only) -->
          <div v-if="!isLogin" class="form-control">
            <label class="label">
              <span class="label-text">Confirm Password</span>
            </label>
            <input 
              v-model="confirmPassword"
              type="password" 
              placeholder="Confirm your password" 
              class="input input-bordered w-full"
              required
            />
          </div>

          <!-- Submit Button -->
          <div class="form-control mt-6">
            <button 
              type="submit" 
              class="btn btn-primary w-full"
              :disabled="authStore.loading"
            >
              <span v-if="authStore.loading" class="loading loading-spinner"></span>
              {{ authStore.loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up') }}
            </button>
          </div>

        <!-- Divider -->
        <div class="divider">OR</div>

        <!-- Social Login Buttons -->
        <div class="space-y-2">
          <button class="btn btn-outline w-full gap-2">
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
          
          <button class="btn btn-outline w-full gap-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Continue with GitHub
          </button>
        </div>

        <!-- Toggle between Login/Register -->
        <p class="text-center mt-4 text-sm">
          {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
          <button 
            @click="toggleMode" 
            class="link link-primary font-semibold"
            type="button"
          >
            {{ isLogin ? 'Sign Up' : 'Sign In' }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional custom styles if needed */
</style>
