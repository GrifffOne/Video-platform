import Layout from '@/layout/Layout'
import { useMovie } from './useMovie'
import { MovieService } from '@/services/movie.service'
import SingleMovie from './SingleMovie'
import { IMovie } from '@/shared/types/movies.types'

export async function generateMetadata({
	params,
}: {
	params: {
		slug: string
	}
}) {
	try {
		const { data: post } = await MovieService.getBySlug(params.slug)
		if (!post)
			return {
				title: 'Not Found',
				description: 'The page you are looking for does not exist',
			}

		return {
			title: post.title,
			description: `Film ${post.title}`,
			alternates: {
				canonical: `/movie/${post.slug}`,
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
	const response = await fetch('http://localhost:4200/api/movies')

	const movies: IMovie[] = await response.json()

	if (!movies) return []
	return movies.map((movie) => ({
		slug: movie.slug,
	}))
}

export default async function MoviePage({
	params: { slug },
}: {
	params: { slug: string }
}) {
	const { movie, similarMovies } = await useMovie(slug)
	return (
		<Layout>
			<SingleMovie movie={movie} similarMovies={similarMovies} />
		</Layout>
	)
}


