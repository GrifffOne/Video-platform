'use client'

import Banner from '@/components/ui/baner/Banner'
import Gallery from '@/components/ui/gallery/Gallery'
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'
import SubHeading from '@/components/ui/heading/SubHeading'
import Content from '@/screens/movie-page/content-baner/Content'
import { IMovie } from '@/shared/types/movies.types'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import { useUpdateCountOpened } from '../useUpdateCountOpened'
import { useMovie } from './useMovie'



const DynamicPlayer = dynamic(
	() => import('@/components/ui/video-player/VideoPlayer'),
	{
		ssr: false,
	}
)

const DynamicRateMovie = dynamic(
	() => import('@/screens/movie-page/rate-movie/RateMovie'),
	{
		ssr: false,
	}
)

interface IMoviePage {
	movie: IMovie | undefined
	similarMovies?: IGalleryItem[]

}


const SingleMovie: FC<IMoviePage> = ({ movie, similarMovies}) => {

	

	if (movie?.slug) useUpdateCountOpened(movie.slug)

	return (
		<>
			{movie && (
				<Banner
					imagePath={movie.bigPoster}
					Detail={() => <Content movie={movie} />}
				/>
			)}

			{movie?.videoUrl && (
				<DynamicPlayer slug={movie?.slug} videoSource={movie?.videoUrl} />
			)}

			<div className="mt-12">
				<SubHeading title="Similar"></SubHeading>
				<Gallery items={similarMovies || []} />
			</div>

			{movie && <DynamicRateMovie slug={movie?.slug} _id={movie._id} />}
		</>
	)
}

export default SingleMovie
