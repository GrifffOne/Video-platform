import { ITableItem } from '@/components/ui/admin-table/AdminTable/admin-table.interface'
import { getAdminUrl } from '@/config/url.config'
import { useDebounce } from '@/hooks/useDebounce'
import { GenreService } from '@/services/genre.service'

import { toastError } from '@/utils/toast-error'
import { useRouter } from 'next/navigation'

import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

export const useGenres = () => {
	const [searchTerm, setSearchTerm] = useState('') // состояние которое получает инпут.

	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery({
		queryKey: ['genres list', debouncedSearch],
		queryFn: () => GenreService.getAll(debouncedSearch),
		select: ({ data }) =>
			data.map(
				(genre): ITableItem => ({
					_id: genre._id,
					editUrl: getAdminUrl(`genres/edit/${genre._id}`),
					items: [genre.name, genre.slug],
				})
			),
		onError: (error) => {
			toastError(error, 'Genre list')
		},
	})

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete genre'],
		mutationFn: (genreId: string) => GenreService.deleteGenre(genreId),
		onError: (error) => {
			toastError(error, 'Delete genre')
		},
		onSuccess: () => {
			toastr.success('Delete genre', 'delete was successful')
			queryData.refetch()
		},
	})

	const { push } = useRouter()

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create genre'],
		mutationFn: () => GenreService.createGenre(),
		onError: (error) => {
			toastError(error, 'Create genre')
		},
		onSuccess: ({ data: _id }) => {
			toastr.success('Create genre', 'create was successful')
			push(getAdminUrl(`genres/edit/${_id}`))
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
