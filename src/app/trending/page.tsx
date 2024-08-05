import type { Metadata } from 'next'
import Layout from '@/layout/Layout'
import { IMovie } from '@/shared/types/movies.types'
import Catalog from '@/components/ui/catalog-movie/Catalog'
import { getPopularMovies } from '@/services/actions/movie-fresh.actions'

export const metadata: Metadata = {
	title: 'Trending movies',
	openGraph: {},
	description: 'Trending movies in excellent quality: legal, safe, without ads',
	alternates: {
		canonical: 'trending',
	},
}


export default async function TrendingPage() {
	let movies: IMovie[] = await getPopularMovies()
	if (!movies) return (movies = [] as IMovie[])

	const trendingMovies = movies.slice(0, 11)

	return (
		<Layout>
			<Catalog
				movies={trendingMovies}
				title="Trending movies"
				description="Trending movies in excellent quality: legal, safe, without ads"
			/>
		</Layout>
	)
}
