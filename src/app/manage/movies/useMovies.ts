import { ITableItem } from '@/components/ui/admin-table/AdminTable/admin-table.interface'
import { getAdminUrl, getMovieUrl } from '@/config/url.config'
import { useDebounce } from '@/hooks/useDebounce'
import { MovieService } from '@/services/movie.service'

import { getGenresList } from '@/utils/movie/getGenresListEach'
import { toastError } from '@/utils/toast-error'
import { useRouter } from 'next/navigation'

import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

export const useMovies = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery({
		queryKey: ['movie list', debouncedSearch],
		queryFn: () => MovieService.getMovies(debouncedSearch),
		select: ({ data }) =>
			data.map(
				(movie): ITableItem => ({
					_id: movie._id,
					editUrl: getAdminUrl(`movies/edit/${movie._id}`),
					items: [
						movie.title,
						getGenresList(movie.genres),
						String(movie.rating),
					],
				})
			),
		onError: (error) => {
			toastError(error, 'Movie list')
		},
	})

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete movie'],
		mutationFn: (movieId: string) => MovieService.deleteMovie(movieId),
		onError: (error) => {
			toastError(error, 'Delete movie')
		},
		onSuccess: () => {
			toastr.success('Delete movie', 'delete was successful')
			queryData.refetch()
		},
	})

	const { push } = useRouter()

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create movie'],
		mutationFn: () => MovieService.createMovie(),
		onError: (error) => {
			toastError(error, 'Create movie')
		},
		onSuccess: ({ data: _id }) => {
			toastr.success('Create movie', 'create was successful')
			push(getAdminUrl(`movies/edit/${_id}`))
		},
	})

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
			createAsync,
		}),
		[queryData, searchTerm, deleteAsync, createAsync]
	)
}
