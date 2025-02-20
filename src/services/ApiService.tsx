// ApiService.tsx
const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN

export interface TvShow {
	id: number
	title: string
	img: string
	airdate: string
}

export interface Details {
	name: string
	img: string
	vote_average: number
	vote_count: number
	first_air_date: string
	last_air_date: string
	number_of_seasons: number
}

export interface SeasonDetails {
	name: string
	vote_average: number
	vote_count: number
	episode_number: number
	air_date: string
}

export interface WatchProvider {
	provider_id: number
	provider_name: string
	provider_logo: string
	provider_link: string
}

const defaultOptions = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${API_TOKEN}`,
	},
}

export async function fetchTvShows(category: string, page: number): Promise<TvShow[]> {
	try {
		const url = `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=${page}`
		const response = await fetch(url, defaultOptions)
		const data = await response.json()

		return data.results.map((tv: any) => ({
			id: tv.id,
			title: tv.name,
			img: `https://image.tmdb.org/t/p/w500${tv.poster_path}`,
			airdate: tv.first_air_date,
		}))
	} catch (error) {
		console.error('Error fetching TV shows from API:', error)
		return []
	}
}

export async function fetchTvDeails(tvShowId: number): Promise<Details> {
	try {
		const url = `https://api.themoviedb.org/3/tv/${tvShowId}?language=en-US`
		const response = await fetch(url, defaultOptions)
		const data = await response.json()

		return {
			name: data.name,
			img: data.backdrop_path,
			vote_average: data.vote_average,
			vote_count: data.vote_count,
			first_air_date: data.first_air_date,
			last_air_date: data.last_air_date,
			number_of_seasons: data.number_of_seasons,
		}
	} catch (error) {
		console.error('Error fetching TV show details from API:', error)
		return {
			name: '',
			img: '',
			vote_average: 0,
			vote_count: 0,
			first_air_date: '',
			last_air_date: '',
			number_of_seasons: 0,
		}
	}
}

export async function fetchSeasonDetails(tvShowId: number, season: number): Promise<SeasonDetails[]> {
	try {
		const url = `https://api.themoviedb.org/3/tv/${tvShowId}/season/${season}?language=en-US`
		const response = await fetch(url, defaultOptions)
		const data = await response.json()

		return data.episodes.map((episode: any) => ({
			name: episode.name,
			vote_average: episode.vote_average,
			vote_count: episode.vote_count,
			episode_number: episode.episode_number,
			air_date: episode.air_date,
		}))
	} catch (error) {
		console.error('Error fetching season details from API:', error)
		return []
	}
}

export async function fetchTvProviders(tvShowId: number): Promise<WatchProvider[]> {
	try {
		const url = `https://api.themoviedb.org/3/tv/${tvShowId}/watch/providers`
		const response = await fetch(url, defaultOptions)
		const data = await response.json()

		if (data.results?.US?.flatrate) {
			return data.results.US.flatrate.map((provider: any) => ({
				provider_id: provider.provider_id,
				provider_name: provider.provider_name,
				provider_logo: `https://image.tmdb.org/t/p/w500${provider.logo_path}`,
				provider_link: data.results.US.link,
			}))
		}
		return []
	} catch (error) {
		console.error('Error fetching TV providers from API:', error)
		return []
	}
}

export async function fetchTvShowSimilar(id: number): Promise<TvShow[]> {
	try {
		const url = `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
		const response = await fetch(url, defaultOptions)
		const data = await response.json()
		return data.results.slice(10).map((tv: any) => ({
			id: tv.id,
			title: tv.name,
			img: `https://image.tmdb.org/t/p/w500${tv.poster_path}`,
			airdate: tv.first_air_date,
		}))
	} catch (error) {
		console.error('Error fetching similar TV shows from API:', error)
		return []
	}
}

export async function searchTvShows(query: string, page: number = 1): Promise<TvShow[]> {
	try {
		const url = `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(query)}&language=en-US&page=${page}`
		const response = await fetch(url, defaultOptions)
		const data = await response.json()

		return data.results.map((tv: any) => ({
			id: tv.id,
			title: tv.name,
			img: `https://image.tmdb.org/t/p/w500${tv.poster_path}`,
			airdate: tv.first_air_date,
		}))
	} catch (error) {
		console.error('Error searching TV shows:', error)
		return []
	}
}
