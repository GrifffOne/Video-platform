import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/utils/meta/seo.constans'

import Layout from '@/layout/Layout'
import UsersList from './UsersList'

export const metadata: Metadata = {
	title: 'Users',
	...NO_INDEX_PAGE,
	openGraph: null,
	alternates: {
		canonical: 'manage/users',
	},
}

const UserListPage = () => {
	return (
		<Layout>
			<UsersList />
		</Layout>
	)
}

export default UserListPage
