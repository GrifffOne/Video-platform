import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/utils/meta/seo.constans'

import Layout from '@/layout/Layout'
import Profile from './Profile'


export const metadata: Metadata = {
	title: 'Profile',
	...NO_INDEX_PAGE,
	openGraph: null,
	alternates: {
		canonical: 'profile',
	},
}

export default function ProfilePage () {
	return (
		<Layout>
			<Profile />
		</Layout>
	)
}


