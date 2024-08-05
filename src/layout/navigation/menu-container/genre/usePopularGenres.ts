import { GenreService } from '@/services/genre.service'
import { useQuery } from 'react-query'
import { IMenuItem } from '../menu.interface'
import { getGenreUrl } from '@/config/url.config'

import { AxiosError } from 'axios'

export const usePopularGenres = () => {
	const queryData = useQuery({
		queryKey: ['popular genre menu'],
		queryFn: () => GenreService.getAll(),

		select: ({ data }) =>
			data
				.filter((genre) => genre.icon)
				.map(
					(genre) =>
						({
							icon: genre.icon,
							link: getGenreUrl(genre.slug),
							title: genre.name,
						}) as IMenuItem
				)
				.splice(0, 4),

		onError: (err: AxiosError) => {
			console.log('Произошла ошибка при запросе:', err.response?.status)
		},
	})

	return queryData
}
