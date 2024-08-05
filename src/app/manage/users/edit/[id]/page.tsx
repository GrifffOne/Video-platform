import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/utils/meta/seo.constans'

import Layout from '@/layout/Layout'
import UserEdit from './UserEdit'

export const metadata: Metadata = {
	title: 'GenreEdit',
	...NO_INDEX_PAGE,
	openGraph: null,
	alternates: {
		canonical: 'manage/users/edit',
	},
}

const GenreEditPage = () => {
	return (
		<Layout>
			<UserEdit />
		</Layout>
	)
}

export default GenreEditPage
