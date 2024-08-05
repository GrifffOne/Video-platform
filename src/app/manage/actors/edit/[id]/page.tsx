import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/utils/meta/seo.constans'

import Layout from '@/layout/Layout'
import ActorEdit from './ActorEdit'

export const metadata: Metadata = {
	title: 'ActorEdit',
	...NO_INDEX_PAGE,
	openGraph: null,
	alternates: {
		canonical: 'manage/actors/edit',
	},
}

const GenreEditPage = () => {
	return (
		<Layout>
			<ActorEdit />
		</Layout>
	)
}

export default GenreEditPage
