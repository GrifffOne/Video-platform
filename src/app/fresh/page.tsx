import type { Metadata } from 'next'
import Layout from '@/layout/Layout'
import { IMovie } from '@/shared/types/movies.types'
import Catalog from '@/components/ui/catalog-movie/Catalog'
import { getMoviesWithUpdate } from '@/services/actions/movie-fresh.actions'

export const metadata: Metadata = {
	title: 'Fresh movies',
	openGraph: {},
	description:
		'New movies and series in excellent quality: legal, safe, without ads',
	alternates: {
		canonical: 'fresh',
	},
}

export default async function FreshPage() {
	let movies: IMovie[] = await getMoviesWithUpdate()
	if (!movies) return (movies = [] as IMovie[])

	const freshMovies = movies.slice(0, 11)

	return (
		<Layout>
			<Catalog
				movies={freshMovies}
				title="Fresh movies"
				description="New movies and series in excellent quality: legal, safe, without ads"
			/>
		</Layout>
	)
}
