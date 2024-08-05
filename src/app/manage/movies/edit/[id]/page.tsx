import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/utils/meta/seo.constans'

import Layout from '@/layout/Layout'
import MovieEdit from './MovieEdit'

export const metadata: Metadata = {
	title: 'MovieEdit',
	...NO_INDEX_PAGE,
	openGraph: null,
	alternates: {
		canonical: 'manage/movies',
	},
}

const GenreEditPage = () => {
	return (
		<Layout>
			<MovieEdit />
		</Layout>
	)
}

export default GenreEditPage
