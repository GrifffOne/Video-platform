import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/utils/meta/seo.constans'

import Layout from '@/layout/Layout'
import GenreEdit from './GenreEdit'

export const metadata: Metadata = {
	title: 'GenreEdit',
	...NO_INDEX_PAGE,
	openGraph: null,
	alternates: {
		canonical: 'manage/genres/edit',
	},
}

const GenreEditPage = () => {
	return (
		<Layout>
			<GenreEdit />
		</Layout>
	)
}

export default GenreEditPage
