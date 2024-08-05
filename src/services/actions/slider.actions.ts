


export async function getMovies() {
	const response = await fetch('http://localhost:4200/api/movies')

	if (!response.ok) {
		throw new Error('Failed to fetch data')
	}

	const data = await response.json()

	return data
}


export async function getMoviesPopular() {
	const response = await fetch('http://localhost:4200/api/movies/most-popular')

	if (!response.ok) {
		throw new Error('Failed to fetch data')
	}

	const data = await response.json()

	return data
}


export async function getActors() {
	const response = await fetch('http://localhost:4200/api/actors')

	if (!response.ok) {
		throw new Error('Failed to fetch data')
	}

	const data = await response.json()

	return data
}
