import type { Metadata } from 'next'
import Layout from '@/layout/Layout'
import {
	getCollectionsGenres,
} from '@/services/actions/movie-fresh.actions'
import { ICollection } from './collections.interface'
import Collections from './Collections'

export const metadata: Metadata = {
	title: 'Collections genres',
	openGraph: {},
	description: 'collections of film genres',
	alternates: {
		canonical: 'collections-genres',
	},
}


export default async function GenresPage() {
	const collections: ICollection[] = await getCollectionsGenres()


	return (
		<Layout>
			<Collections collections={collections} />
		</Layout>
	)
}
