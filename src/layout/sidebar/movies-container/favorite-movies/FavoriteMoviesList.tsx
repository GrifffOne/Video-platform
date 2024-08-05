'use client'

import { FC } from 'react'
import { useAuth } from '@/hooks/useAuth'
import NotAuthFavorites from './NotAuthFavorites'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import MoviesList from '../MoviesList'
import { useFavoriteMovies } from '@/app/favorites/useFavoriteMovie'



const FavoriteMoviesList: FC = () => {

	const { user } = useAuth()
	const { isLoading, favoriteMovies } = useFavoriteMovies(user)

	if (!user) return <NotAuthFavorites />

	return isLoading ? (
		<div className="mt-11">
			<SkeletonLoader count={3} className="h-28 mb-4" />
		</div>
	) : (
		<MoviesList
			list={{
				link: '/favorites',
				movies: favoriteMovies?.slice(0, 3) || [],
				title: 'Favorites',
			}}
		/>
	)
}

export default FavoriteMoviesList
