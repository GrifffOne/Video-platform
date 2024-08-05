import { IGenre, IMovie } from '@/shared/types/movies.types'


export const useGenre = async (slug: string) => {
	async function getGenre() {
		const response = await fetch(
			`http://localhost:4200/api/genres/by-slug/${slug}`,
			{
				next: { revalidate: 3600 },
			}
		)
		const data = await response.json()
		if (!response.ok) throw new Error(data.error)

		return data
	}

	const genre: IGenre = await getGenre()

	async function getSimilarMovies() {
		const response = await fetch('http://localhost:4200/api/movies/by-genres', {
			next: { revalidate: 3600 },
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ genreIds: genre?._id }),
		})

		if (!response.ok) {
			return []
		}

		const data = await response.json()
		return data
	}

	const movies: IMovie[] = await getSimilarMovies()

	return { genre, movies }
}
