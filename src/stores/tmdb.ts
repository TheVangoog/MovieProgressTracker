import { defineStore } from 'pinia'
import axios from 'axios'

export type TmdbTvItem = {
  id: number
  name: string
  image: string
}

const TMDB_V3_BASE = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p'
const IMAGE_SIZE = 'w342'

function getApiKey(): string | undefined {
  const env = import.meta.env || {}
  return env.VITE_TMDB_KEY
}

interface TmdbResult {
  id: number
  name?: string
  original_name?: string
  title?: string
  poster_path?: string | null,
  vote_average: number,
  genre_ids: string[],
}

const axiosInstance = axios.create({
  baseURL: TMDB_V3_BASE,
  params: {
    api_key: getApiKey(),
  },
})

function buildImageUrl(posterPath: string | null | undefined): string {
  if (!posterPath) return 'https://via.placeholder.com/342x513?text=No+Image'
  return `${TMDB_IMAGE_BASE}/${IMAGE_SIZE}${posterPath}`
}

function normalizeTvResults(results: TmdbResult[]): TmdbTvItem[] {
  return results.map((r) => ({
    id: r.id,
    name: r.name || r.original_name || r.title || 'Untitled',
    image: buildImageUrl(r.poster_path),
    rating: r.vote_average,
    tags: r.genre_ids,
  }))
}

async function fetchJson(url: string): Promise<TmdbResult[] | { results: TmdbResult[] }> {
  const res = await axiosInstance.get(url)
  return res.data
}

export function buildTrendingTvEndpoint(): string {
  return '/trending/tv/week'
}

export function buildPopularTvEndpoint(): string {
  return '/tv/popular'
}

export function buildSearchTvEndpoint(query: string): string {
  const q = (query || '').trim()
  if (!q) return ''
  return `/search/tv?query=${encodeURIComponent(q)}`
}

export async function fetchListFromEndpoint(endpoint: string): Promise<TmdbTvItem[]> {
  const data = await fetchJson(endpoint)
  const results = Array.isArray(data) ? data : data?.results || []
  return normalizeTvResults(results)
}

export type TmdbGenre = {
  id: number
  name: string
}

export async function fetchGenres(): Promise<TmdbGenre[]> {
  try {
    const res = await axiosInstance.get('/genre/tv/list', {
      params: { language: 'en' }
    })
    return res.data.genres || []
  } catch (error) {
    console.error('Failed to fetch genres:', error)
    return []
  }
}

export const useTmdbStore = defineStore('tmdb', {
  state: () => ({
    items: [] as TmdbTvItem[],
    page: 1,
    loading: false,
    query: '',
    mode: 'trending' as 'trending' | 'search',
  }),

  getters: {
    sortedItems(state) {
      return state.items
    },
  },

  actions: {
    async loadTrending(reset = false) {
      if (this.loading) return
      this.loading = true

      try {
        if (reset) {
          this.items = []
          this.page = 1
          this.mode = 'trending'
        }

        const endpoint = `${buildTrendingTvEndpoint()}?page=${this.page}`
        const list = await fetchListFromEndpoint(endpoint)
        this.items.push(...list)
        this.page++
      } catch (error) {
        console.error('Failed to load trending:', error)
      } finally {
        this.loading = false
      }
    },

    async searchShows(query: string, reset = true) {
      if (this.loading) return
      this.loading = true

      if (reset) {
        this.items = []
        this.page = 1
        this.query = query
        this.mode = 'search'
      }

      if (!this.query.trim()) {
        this.loading = false
        return
      }

      const base = buildSearchTvEndpoint(this.query)
      const endpoint = `${base}&page=${this.page}`
      const list = await fetchListFromEndpoint(endpoint)
      this.items.push(...list)
      this.page++
      this.loading = false
    },
  },
})
