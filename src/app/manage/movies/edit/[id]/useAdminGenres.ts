import { IOption } from '@/components/ui/select/select.interface'
import { GenreService } from '@/services/genre.service'
import { toastError } from '@/utils/toast-error'
import { useQuery } from 'react-query'


export const useAdminGenres = () => {
	const queryData = useQuery({
		queryKey: ['list of genre'],
		queryFn: () => GenreService.getAll(),
		select: ({ data }) =>
			data.map(
				(genre): IOption => ({
					label: genre.name,
					value: genre._id,
				})
			),
		onError(error) {
			toastError(error, 'genre list')
		},
	})

	return queryData
}
