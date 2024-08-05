import { toastError } from '@/utils/toast-error'
import { error } from 'console'


export async function getMoviesWithUpdate() {
	const response = await fetch('http://localhost:4200/api/movies', {
		next: { revalidate: 3600 },
	})

	if (!response.ok) {
		throw new Error('Failed to fetch data')
	}

	const data = await response.json()

	return data
}


export async function getPopularMovies() {
	const response = await fetch(
		'http://localhost:4200/api/movies/most-popular',
		{
			next: { revalidate: 3600 },
		}
	)

	if (!response.ok) {
		throw new Error('Failed to fetch data')
	}

	const data = await response.json()

	return data
}


export async function getCollectionsGenres() {
	const response = await fetch('http://localhost:4200/api/genres/collections', {
		next: { revalidate: 3600 },
	})

	if (!response.ok) {
		return []
	}

	const data = await response.json()

	return data
}
