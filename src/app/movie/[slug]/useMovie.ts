import { getMovieUrl } from '@/config/url.config'
import { IMovie } from '@/shared/types/movies.types'


export const useMovie = async (slug: string) => {
	async function getPopularMovies() {
		const response = await fetch(
			`http://localhost:4200/api/movies/by-slug/${slug}`,
			{
				next: { revalidate: 3600 },
			}
		)
		if (!response.ok) return null

		const data = await response.json()
		return data
	}

	const movie: IMovie = await getPopularMovies()

	const genreIds = movie?.genres.map((g) => g._id)

	async function getSimilarMovies() {
		const response = await fetch('http://localhost:4200/api/movies/by-genres', {
			next: { revalidate: 3600 },
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ genreIds: genreIds }),
		})

		if (!response.ok) {
			return []
		}

		const data = await response.json()
		return data
	}

	const responseSimilarMovies: IMovie[] = await getSimilarMovies()

	const similarMovies = responseSimilarMovies
		.filter((m) => m._id !== movie?._id)
		.map((m) => ({
			name: m.title,
			posterPath: m.poster,
			url: getMovieUrl(m.slug),
		}))

	return { movie, similarMovies }
}
