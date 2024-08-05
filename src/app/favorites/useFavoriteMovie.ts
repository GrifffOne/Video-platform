import { UserService } from '@/services/user.service'
import { IUserState } from '@/store/user/user.interface'
import { useQuery } from 'react-query'

export const useFavoriteMovies = (user: IUserState | null) => {
	const {
		data: favoriteMovies,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ['favorite movies'],
		queryFn: () => UserService.getFavoriteMovies(),
		select: ({ data }) => data,
		enabled: !!user,
	})

	return { favoriteMovies, isLoading, refetch }
}
