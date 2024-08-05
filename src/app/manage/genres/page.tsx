import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/utils/meta/seo.constans'

import Layout from '@/layout/Layout'
import GenresList from './GenresList'

export const metadata: Metadata = {
	title: 'Genres',
	...NO_INDEX_PAGE,
	openGraph: null,
	alternates: {
		canonical: 'manage/genres',
	},
}

const GenresListPage = () => {
	return (
		<Layout>
			<GenresList />
		</Layout>
	)
}

export default GenresListPage
