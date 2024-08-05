import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { MovieService } from '@/services/movie.service'
import { FC } from 'react'
import { useQuery } from 'react-query'
import MoviesList from './MoviesList'


const PopularMovies: FC = () => {
	const { isLoading, data: popularMovies } = useQuery({
		queryKey: 'Popular movies in sidebar',
		queryFn: () => MovieService.getMostPopularMovies(),
		select: (data) => data.slice(0, 3),
	})

	return isLoading ? (
		<div className="mt-11">
			<SkeletonLoader count={3} className="h-28 mb-4" />
		</div>
	) : (
		<MoviesList
			list={{
				link: '/trending',
				movies: popularMovies || [],
				title: 'Popular movies',
			}}
		/>
	)
}

export default PopularMovies
