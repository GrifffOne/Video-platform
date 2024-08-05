import Layout from '@/layout/Layout'
import Catalog from '@/components/ui/catalog-movie/Catalog'
import { useActor } from './useActor'
import { ActorService } from '@/services/actor.service'

export async function generateMetadata({
	params,
}: {
	params: {
		slug: string
	}
}) {
	try {
		const { data: post } = await ActorService.getBySlug(params.slug)
		if (!post)
			return {
				title: 'Not Found',
				description: 'The page you are looking for does not exist',
			}

		return {
			title: post.name,
			description: 'Page actor',
			alternates: {
				canonical: `/actor/${post.slug}`,
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
	const { data: actors } = await ActorService.getActors()

	if (!actors) return []
	return actors.map((actor) => ({
		slug: actor.slug,
	}))
}

export default async function ActorPage({
	params: { slug },
}: {
	params: { slug: string }
}) {
	const { actor, movies } = await useActor(slug)

	return (
		<Layout>{movies && <Catalog movies={movies} title={actor?.name} />}</Layout>
	)
}
