import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { IGenreEditInput } from './genre-edit.interface'
import { useParams, useRouter } from 'next/navigation'
import { useMutation, useQuery } from 'react-query'
import { GenreService } from '@/services/genre.service'
import { getKeys } from '@/utils/object/getKeys'
import { toastError } from '@/utils/toast-error'
import { toastr } from 'react-redux-toastr'
import { getAdminUrl } from '@/config/url.config'


export const useGenreEdit = (setValue: UseFormSetValue<IGenreEditInput>) => {

	const { push } = useRouter()


	const queryParam = useParams()
	const genreId = String(queryParam.id)


	const { isLoading } = useQuery({
		queryKey: ['genre', genreId],
		queryFn: () => GenreService.getById(genreId),
		onSuccess: ({ data }) => {
			getKeys(data).forEach((key) => {
				setValue(key, data[key])
			})
		},
		onError: (error) => {
			toastError(error, 'Get genre')
		},
		enabled: !!queryParam.id,
	})


	const { mutateAsync } = useMutation({
		mutationKey: ['update genre'],
		mutationFn: (data: IGenreEditInput) =>
			GenreService.updateGenre(genreId, data),
		onError: (error) => {
			toastError(error, 'Update genre')
		},
		onSuccess: () => {
			toastr.success('Update genre', 'update was successful')
			push(getAdminUrl('genres'))
		},
	})


	const onSubmit: SubmitHandler<IGenreEditInput> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
