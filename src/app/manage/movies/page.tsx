import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/utils/meta/seo.constans'

import Layout from '@/layout/Layout'
import MoviesList from './MoviesList'

export const metadata: Metadata = {
	title: 'Movies',
	...NO_INDEX_PAGE,
	openGraph: null,
	alternates: {
		canonical: 'manage/movies',
	},
}

const MoviesListPage = () => {
	return (
		<Layout>
			<MoviesList />
		</Layout>
	)
}

export default MoviesListPage
