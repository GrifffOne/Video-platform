import { ITableItem } from '@/components/ui/admin-table/AdminTable/admin-table.interface'
import { getAdminUrl, getMovieUrl } from '@/config/url.config'
import { useDebounce } from '@/hooks/useDebounce'
import { ActorService } from '@/services/actor.service'

import { toastError } from '@/utils/toast-error'
import { useRouter } from 'next/navigation'

import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

export const useActors = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery({
		queryKey: ['actors list', debouncedSearch],
		queryFn: () => ActorService.getActors(debouncedSearch),
		select: ({ data }) =>
			data.map(
				(actor): ITableItem => ({
					_id: actor._id,
					editUrl: getAdminUrl(`actors/edit/${actor._id}`),
					items: [actor.name, String(actor.countMovies)],
				})
			),
		onError: (error) => {
			toastError(error, 'Actor list')
		},
	})

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete actor'],
		mutationFn: (actorId: string) => ActorService.deleteActor(actorId),
		onError: (error) => {
			toastError(error, 'Delete actor')
		},
		onSuccess: () => {
			toastr.success('Delete actor', 'delete was successful')
			queryData.refetch()
		},
	})

	const { push } = useRouter()

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create actor'],
		mutationFn: () => ActorService.createActor(),
		onError: (error) => {
			toastError(error, 'Create actor')
		},
		onSuccess: ({ data: _id }) => {
			toastr.success('Create actor', 'create was successful')
			push(getAdminUrl(`actors/edit/${_id}`))
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
