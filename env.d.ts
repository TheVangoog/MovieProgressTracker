/// <reference types="vite/client" />

declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}

interface ImportMetaEnv {
	readonly VITE_TMDB_API_KEY?: string
	readonly VITE_TMDB_TOKEN?: string
	readonly VITE_SUPABASE_KEY?: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
