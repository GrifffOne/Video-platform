import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useParams, useRouter } from 'next/navigation'
import { useMutation, useQuery } from 'react-query'
import { GenreService } from '@/services/genre.service'
import { getKeys } from '@/utils/object/getKeys'
import { toastError } from '@/utils/toast-error'
import { toastr } from 'react-redux-toastr'
import { getAdminUrl } from '@/config/url.config'
import { IMovieEditInput } from './movie-edit.interface'
import { MovieService } from '@/services/movie.service'

export const useMovieEdit = (setValue: UseFormSetValue<IMovieEditInput>) => {
	const { push } = useRouter()

	const queryParam = useParams()
	const movieId = String(queryParam.id)

	const { isLoading } = useQuery({
		queryKey: ['movie', movieId],
		queryFn: () => MovieService.getById(movieId),
		onSuccess: ({ data }) => {
			getKeys(data).forEach((key) => {
				setValue(key, data[key])
			})
		},
		onError: (error) => {
			toastError(error, 'Get movie')
		},
		enabled: !!queryParam.id,
	})

	const { mutateAsync } = useMutation({
		mutationKey: ['update movie'],
		mutationFn: (data: IMovieEditInput) =>
			MovieService.updateMovie(movieId, data),
		onError: (error) => {
			toastError(error, 'Update movie')
		},
		onSuccess: () => {
			toastr.success('Update movie', 'update was successful')
			push(getAdminUrl('movies'))
		},
	})

	const onSubmit: SubmitHandler<IMovieEditInput> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
