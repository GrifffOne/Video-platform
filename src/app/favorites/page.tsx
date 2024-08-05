import type { Metadata } from 'next'

import Layout from '@/layout/Layout'
import Favorites from './Favorites'

export const metadata: Metadata = {
	title: 'Favorite Movies',
	openGraph: {},
	alternates: {
		canonical: 'profile',
	},
}

export default function FavoritePage() {
	return (
		<Layout>
			<Favorites />
		</Layout>
	)
}
