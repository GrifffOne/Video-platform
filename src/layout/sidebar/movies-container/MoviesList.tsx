import { FC } from 'react'
import styles from './MoviesList.module.scss'
import { IMovieList } from './movie-list.interface'
import MovieItem from './MovieItem'
import Link from 'next/link'

const MoviesList: FC<{ list: IMovieList }> = ({
	list: { link, title, movies },
}) => {
	return (
		<div className={styles.list}>
			<div className={styles.heading}>{title}</div>
			{movies.map((movie) => (
				<MovieItem key={movie._id} movie={movie} />
			))}
			<Link href={link} className={styles.button}>
				{link === '/trending' ? 'All trending movies' : 'See more'}
			</Link>
		</div>
	)
}

export default MoviesList
