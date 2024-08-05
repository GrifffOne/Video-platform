import { FC } from 'react'
import PopularMovies from './PopularMovies'
import dynamic from 'next/dynamic'

const DynamicFavoriteMoviesList = dynamic(
	() => import('./favorite-movies/FavoriteMoviesList'),
	{
		ssr: false,
	}
)

const MoviesContainer: FC = () => {
	return (
		<div>
			<PopularMovies />
			<DynamicFavoriteMoviesList />
		</div>
	)
}

export default MoviesContainer
