import { FC } from 'react'

import styles from '../Admin.module.scss'
import cn from 'classnames'

import { useQuery } from 'react-query'
import { MovieService } from '@/services/movie.service'
import { getMovieUrl } from '@/config/url.config'
import Link from 'next/link'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import SubHeading from '@/components/ui/heading/SubHeading'
import Image from 'next/image'
import { IMovie } from '@/shared/types/movies.types'


const PopularMovie: FC = () => {
	const { isLoading, data: movie } = useQuery({
		queryKey: ['Most popular movie in admin'],
		queryFn: () => MovieService.getMostPopularMovies(),
		select: (data): IMovie => data[0],
	})

	return (
		<div className={cn(styles.block, styles.popular)}>
			<SubHeading title="The most popular movie" />
			{isLoading ? (
				<SkeletonLoader className="h-48" />
			) : (
				movie && (
					<>
						<h3>Opened {movie.countOpened} times</h3>
						<Link href={getMovieUrl(movie.slug)}>
							<Image
								width={0}
								height={0}
								src={movie.bigPoster}
								alt={movie.title}
								className={styles.image}
								priority
								unoptimized
								draggable={false}
							/>
						</Link>
					</>
				)
			)}
		</div>
	)
}

export default PopularMovie
