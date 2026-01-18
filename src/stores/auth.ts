import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'
import type { User, Session } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', {
  state() {
    return {
      user: null as User | null,
      session: null as Session | null,
      loading: false,
      error: null as string | null,
    }
  },

  getters: {
    isAuthenticated(): boolean {
      return !!this.user
    }
  },

  actions: {
    async initialize() {
      this.loading = true
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession()
        this.session = currentSession
        this.user = currentSession?.user ?? null

        if (currentSession?.user) {
          localStorage.setItem('user_id', currentSession.user.id)
          localStorage.setItem('user_email', currentSession.user.email || '')
          console.log('User restored from session:', currentSession.user.email)
        } else {
          localStorage.removeItem('user_id')
          localStorage.removeItem('user_email')
        }

        supabase.auth.onAuthStateChange((_event, newSession) => {
          this.session = newSession
          this.user = newSession?.user ?? null
          
          if (newSession?.user) {
            localStorage.setItem('user_id', newSession.user.id)
            localStorage.setItem('user_email', newSession.user.email || '')
            console.log('Auth state changed:', _event, newSession.user.email)
          } else {
            localStorage.removeItem('user_id')
            localStorage.removeItem('user_email')
            console.log('Auth state changed: logged out')
          }
        })
      } catch (err: any) {
        this.error = err.message
        console.error('Auth initialization error:', err)
      } finally {
        this.loading = false
      }
    },

    async signUp(email: string, password: string, username?: string) {
      this.loading = true
      this.error = null
      try {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username: username || email.split('@')[0]
            }
          }
        })

        if (signUpError) throw signUpError

        this.session = data.session
        this.user = data.user

        if (data.user) {
          localStorage.setItem('user_id', data.user.id)
          localStorage.setItem('user_email', data.user.email || '')
        }

        return { success: true, data }
      } catch (err: any) {
        this.error = err.message
        console.error('Sign up error:', err)
        return { success: false, error: err.message }
      } finally {
        this.loading = false
      }
    },

    async signIn(email: string, password: string) {
      this.loading = true
      this.error = null
      try {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        if (signInError) throw signInError

        this.session = data.session
        this.user = data.user

        if (data.user) {
          localStorage.setItem('user_id', data.user.id)
          localStorage.setItem('user_email', data.user.email || '')
          console.log('User logged in and saved:', data.user.email)
        }

        return { success: true, data }
      } catch (err: any) {
        this.error = err.message
        console.error('Sign in error:', err)
        return { success: false, error: err.message }
      } finally {
        this.loading = false
      }
    },

    async signOut() {
      this.loading = true
      this.error = null
      try {
        const { error: signOutError } = await supabase.auth.signOut()
        if (signOutError) throw signOutError

        this.session = null
        this.user = null

        localStorage.removeItem('user_id')
        localStorage.removeItem('user_email')
        console.log('User logged out and cleared from storage')

        return { success: true }
      } catch (err: any) {
        this.error = err.message
        console.error('Sign out error:', err)
        return { success: false, error: err.message }
      } finally {
        this.loading = false
      }
    }
  }
})
