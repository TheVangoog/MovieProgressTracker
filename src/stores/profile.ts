import { defineStore } from "pinia";
import { supabase } from "@/utils/supabase";

export type ShowStatus = "planning" | "watching" | "watched" | "dropped";

export interface SavedShow {
  id?: number;
  tmdb_id: number;
  name: string;
  status: ShowStatus;
  is_favourite: boolean;
  image?: string;
  addedDate: string;
  user_id?: string;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  joinDate: string;
}

export const useProfileStore = defineStore("profile", {
  state: () => ({
    user: {
      id: 1,
      name: "Film Lover",
      email: "user@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=FilmLover",
      bio: "Passionate about TV shows and movies.",
      joinDate: new Date().toLocaleDateString(),
    } as UserProfile,
    savedShows: [] as SavedShow[],
    loading: false,
  }),

  getters: {
    userInfo(state) {
      return state.user;
    },

    showsByStatus(state) {
      return (status: ShowStatus) => state.savedShows.filter(s => s.status === status);
    },

    favouriteShows(state) {
      return state.savedShows.filter(s => s.is_favourite);
    },

    planningCount(state) {
      return state.savedShows.filter(s => s.status === "planning").length;
    },

    watchingCount(state) {
      return state.savedShows.filter(s => s.status === "watching").length;
    },

    watchedCount(state) {
      return state.savedShows.filter(s => s.status === "watched").length;
    },

    droppedCount(state) {
      return state.savedShows.filter(s => s.status === "dropped").length;
    },

    favouriteCount(state) {
      return state.savedShows.filter(s => s.is_favourite).length;
    },

    totalShowsCount(state) {
      return state.savedShows.length;
    },

    getShowStatus(state) {
      return (showId: number): ShowStatus | null => {
        const show = state.savedShows.find(s => s.tmdb_id === showId);
        return show ? show.status : null;
      };
    },
  },

  actions: {
    // Fetch user's saved shows from Supabase
    async fetchSavedShows(userId: string) {
      this.loading = true;
      try {
        const { data, error } = await supabase
          .from('saved_shows')
          .select('*')
          .eq('user_id', userId);

        if (error) throw error;

        this.savedShows = data || [];
        console.log('Fetched saved shows:', data);
      } catch (error: any) {
        console.error('Error fetching saved shows:', error.message);
      } finally {
        this.loading = false;
      }
    },

    // Save or update show to Supabase
    async saveShow(id: number, name: string, status: ShowStatus, image?: string, userId?: string, isFavourite: boolean = false) {
      if (!userId) {
        console.error('User ID required to save show');
        return;
      }

      try {
        const existing = this.savedShows.find(s => s.tmdb_id === id && s.user_id === userId);
        
        if (existing) {
          // Update existing
          const { error } = await supabase
            .from('saved_shows')
            .update({ status, name, image, is_favourite: isFavourite })
            .eq('tmdb_id', id)
            .eq('user_id', userId);

          if (error) throw error;
          existing.status = status;
          existing.is_favourite = isFavourite;
          console.log('Updated show:', name, 'to', status);
        } else {
          // Try insert, if duplicate key then update
          try {
            const { data, error } = await supabase
              .from('saved_shows')
              .insert({
                tmdb_id: id,
                name,
                status,
                is_favourite: isFavourite,
                image,
                user_id: userId,
                addedDate: new Date().toISOString(),
              })
              .select()
              .single();

            if (error) throw error;
            this.savedShows.push(data);
            console.log('Saved new show:', name, 'as', status);
          } catch (insertError: any) {
            // If duplicate key, update instead
            if (insertError.message.includes('duplicate key')) {
              const { error: updateError } = await supabase
                .from('saved_shows')
                .update({ status, name, image, is_favourite: isFavourite })
                .eq('tmdb_id', id)
                .eq('user_id', userId);

              if (updateError) throw updateError;
              
              // Add to local array if not present
              if (!existing) {
                this.savedShows.push({
                  tmdb_id: id,
                  name,
                  status,
                  is_favourite: isFavourite,
                  image,
                  user_id: userId,
                  addedDate: new Date().toISOString(),
                });
              }
              console.log('Updated show (duplicate key):', name, 'to', status);
            } else {
              throw insertError;
            }
          }
        }
      } catch (error: any) {
        console.error('Error saving show:', error.message);
      }
    },

    // Remove show from Supabase
    async removeShow(showId: number, userId?: string) {
      if (!userId) {
        console.error('User ID required to remove show');
        return;
      }

      try {
        const { error } = await supabase
          .from('saved_shows')
          .delete()
          .eq('tmdb_id', showId)
          .eq('user_id', userId);

        if (error) throw error;

        const idx = this.savedShows.findIndex(s => s.tmdb_id === showId);
        if (idx > -1) {
          this.savedShows.splice(idx, 1);
        }
        console.log('Removed show:', showId);
      } catch (error: any) {
        console.error('Error removing show:', error.message);
      }
    },

    updateShowStatus(showId: number, newStatus: ShowStatus) {
      const show = this.savedShows.find(s => s.tmdb_id === showId);
      if (show) {
        show.status = newStatus;
      }
    },

    updateProfile(updates: Partial<UserProfile>) {
      this.user = { ...this.user, ...updates };
    },

    setUserName(name: string) {
      this.user.name = name;
    },

    setUserBio(bio: string) {
      this.user.bio = bio;
    },
  },
});
