import { IActor, IMovie } from '@/shared/types/movies.types'
import { notFound } from 'next/navigation'


export const useActor = async (slug: string) => {
	async function getActor() {
		const response = await fetch(
			`http://localhost:4200/api/actors/by-slug/${slug}`,
			{
				next: { revalidate: 3600 },
			}
		)
		const data = await response.json()
		if (!response.ok) {
			notFound()
		}

		return data
	}

	const actor: IActor = await getActor()

	async function getSimilarMovies() {
		const response = await fetch(
			`http://localhost:4200/api/movies/by-actor/${actor._id}`,
			{
				next: { revalidate: 3600 },
			}
		)

		if (!response.ok) {
			return []
		}

		const data = await response.json()
		return data
	}

	const movies: IMovie[] = await getSimilarMovies()

	return { actor, movies }
}
