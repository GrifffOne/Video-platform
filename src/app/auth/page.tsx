import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/utils/meta/seo.constans'
import Auth from './Auth'
import Layout from '@/layout/Layout'
import { Suspense } from 'react'

export const metadata: Metadata = {
	title: 'Auth',
	...NO_INDEX_PAGE,
	openGraph: null,
	alternates: {
		canonical: 'auth',
	},
}

export default function AuthPage() {
	return (
		<Layout>
			<Suspense>
				<Auth />
			</Suspense>
		</Layout>
	)
}
