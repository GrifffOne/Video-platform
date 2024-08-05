import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/utils/meta/seo.constans'
import Admin from './Admin'
import Layout from '@/layout/Layout'

export const metadata: Metadata = {
	title: 'Auth',
	...NO_INDEX_PAGE,
	openGraph: null,
	alternates: {
		canonical: 'manage',
	},
}

const AdminPage = () => {
	return (
		<Layout>
			<Admin />
		</Layout>
	)
}

export default AdminPage
