'use client'

import { FC } from 'react'
import Heading from '@/components/ui/heading/Heading'
import FavoriteItem from './FavoriteItem'
import styles from './Favorites.module.scss'
import { useFavoriteMovies } from './useFavoriteMovie'
import { useAuth } from '@/hooks/useAuth'
import SkeletonLoader from '@/components/ui/SkeletonLoader'



const Favorites: FC = () => {
	const { user } = useAuth()
	const { favoriteMovies, isLoading } = useFavoriteMovies(user)

	return (
		<>
			<Heading title={'Favorites'} />
			<section className={styles.favorites}>
				{isLoading ? (
					<SkeletonLoader
						count={3}
						className={styles.skeletonLoader}
						containerClassName={styles.containerLoader}
					/>
				) : (
					favoriteMovies?.map((movie) => (
						<FavoriteItem key={movie._id} movie={movie} />
					))
				)}
			</section>
		</>
	)
}

export default Favorites
