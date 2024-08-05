import Layout from '@/layout/Layout'
import Catalog from '@/components/ui/catalog-movie/Catalog'
import { GenreService } from '@/services/genre.service'

import { onlyText } from '@/utils/string/clearText'
import { IGenre, IMovie } from '@/shared/types/movies.types'
import { useGenre } from './useGenre'



export async function generateMetadata({
	params,
}: {
	params: {
		slug: string
	}
}) {
	try {
		const { data: post } = await GenreService.getBySlug(params.slug)
		if (!post)
			return {
				title: 'Not Found',
				description: 'The page you are looking for does not exist',
			}

		return {
			title: post.name,
			description: onlyText(post.description),
			alternates: {
				canonical: `/genre/${post.slug}`,
			},
		}
	} catch (error) {
		console.error(error)
		return {
			title: 'Not Found',
			description: 'The page you are looking for does not exist',
		}
	}
}

export async function generateStaticParams() {
	const { data: genres } = await GenreService.getAll()

	if (!genres) return []
	return genres.map((genre) => ({
		slug: genre.slug,
	}))
}

export default async function GenrePage({
	params: { slug },
}: {
	params: { slug: string }
}) {
	const { genre, movies } = await useGenre(slug)

	return (
		<Layout>
			{movies && (
				<Catalog
					movies={movies}
					title={genre.name}
					description={genre.description}
				/>
			)}
		</Layout>
	)
}
