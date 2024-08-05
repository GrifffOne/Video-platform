'use client'

import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './MoviesList.module.scss'
import { getGenreUrl, getMovieUrl } from '@/config/url.config'
import { IMovie } from '@/shared/types/movies.types'
import { getGenresListEach } from '@/utils/movie/getGenresListEach'
import { IWidgetMovie } from './movie-list.interface'
import MaterialIcon from '@/components/ui/MaterialIcon'


const MovieItem: FC<{ movie: IWidgetMovie }> = ({ movie }) => {
	return (
		<div className={styles.item}>
			<Link href={getMovieUrl(movie.slug)}>
				<Image
					alt={movie.title}
					width={175}
					height={285}
					src={movie.poster}
					draggable={false}
					priority
				/>
			</Link>

			<div className={styles.info}>
				<div>
					<div className={styles.title}>{movie.title}</div>
					<div className={styles.genres}>
						{movie.genres.map(({ slug, name, _id }, index) => (
							<Link key={_id} href={getGenreUrl(slug)}>
								{getGenresListEach(index, movie.genres.length, name)}
							</Link>
						))}
					</div>
				</div>
				<div className={styles.rating}>
					<MaterialIcon name="MdStarRate" />
					<span>{movie.rating.toFixed(1)}</span>
				</div>
			</div>
		</div>
	)
}

export default MovieItem
