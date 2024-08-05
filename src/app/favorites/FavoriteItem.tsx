import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import styles from './Favorites.module.scss'
import FavoriteButton from '@/components/ui/favorite-button/FavoriteButton'
import { IMovie } from '@/shared/types/movies.types'
import { getMovieUrl } from '@/config/url.config'


const FavoriteItem: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={styles.itemWrapper}>
			<FavoriteButton movieId={movie._id} />
			<Link href={getMovieUrl(movie.slug)} className={styles.item}>
				<Image
					alt={movie.title}
					src={movie.bigPoster}
					fill
					sizes="100%"
					draggable={false}
					priority
				/>
				<div className={styles.title}>{movie.title}</div>
			</Link>
		</div>
	)
}

export default FavoriteItem
