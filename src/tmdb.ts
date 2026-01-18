// Centralized TMDB API helpers
// Minimal, focused utilities to build endpoints and fetch normalized TV show lists

export type TmdbTvItem = {
  id: number;
  name: string;
  image: string;
};

const TMDB_V3_BASE = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";
const IMAGE_SIZE = "w342"; // good balance of quality and size

function getApiKey(): string | undefined {
  const env = (import.meta as any).env || {};
  // Support multiple common names for compatibility
  return (
    env.VITE_TMDB_API_KEY ||
    env.VITE_TMDB_KEY ||
    env.TMDB_API_KEY ||
    env.TMDB_KEY
  );
}

function getBearerToken(): string | undefined {
  const env = (import.meta as any).env || {};
  // Support multiple common names for compatibility
  return (
    env.VITE_TMDB_TOKEN ||
    env.VITE_TMDB_BEARER ||
    env.VITE_TMDB_V4_TOKEN ||
    env.TMDB_TOKEN ||
    env.TMDB_BEARER
  );
}

function ensureApiKey(url: string): string {
  const apiKey = getApiKey();
  if (!apiKey) return url; // may rely on Bearer token instead

  const hasQuery = url.includes("?");
  const hasApiKey = /[?&]api_key=/.test(url);
  if (hasApiKey) return url;

  return `${url}${hasQuery ? "&" : "?"}api_key=${encodeURIComponent(apiKey)}`;
}

function buildImageUrl(posterPath: string | null | undefined): string {
  if (!posterPath) return "https://via.placeholder.com/342x513?text=No+Image";
  return `${TMDB_IMAGE_BASE}/${IMAGE_SIZE}${posterPath}`;
}

function normalizeTvResults(results: any[]): TmdbTvItem[] {
  return (results || []).map((r) => ({
    id: r.id,
    name: r.name || r.original_name || r.title || "Untitled",
    image: buildImageUrl(r.poster_path),
  }));
}

async function fetchJson(url: string): Promise<any> {
  const token = getBearerToken();
  const finalUrl = ensureApiKey(url);
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(finalUrl, { headers });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    if (res.status === 401) {
      throw new Error(
        "TMDB 401 Unauthorized: Check your API credentials (VITE_TMDB_API_KEY or VITE_TMDB_TOKEN) and restart the dev server."
      );
    }
    throw new Error(`TMDB request failed (${res.status}): ${text || res.statusText}`);
  }
  return res.json();
}

// Builders
export function buildTrendingTvEndpoint(): string {
  return `${TMDB_V3_BASE}/trending/tv/week`;
}

export function buildPopularTvEndpoint(): string {
  return `${TMDB_V3_BASE}/tv/popular`;
}

export function buildSearchTvEndpoint(query: string): string {
  const q = (query || "").trim();
  if (!q) return "";
  return `${TMDB_V3_BASE}/search/tv?query=${encodeURIComponent(q)}`;
}

// Fetch a normalized list from any v3 endpoint that returns { results: [...] }
export async function fetchListFromEndpoint(endpoint: string): Promise<TmdbTvItem[]> {
  const url = endpoint.startsWith("http") ? endpoint : `${TMDB_V3_BASE}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
  const data = await fetchJson(url);
  const results = Array.isArray(data) ? data : data?.results || [];
  return normalizeTvResults(results);
}
