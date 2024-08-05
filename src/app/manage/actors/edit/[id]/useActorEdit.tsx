import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useParams, useRouter } from 'next/navigation'
import { useMutation, useQuery } from 'react-query'
import { GenreService } from '@/services/genre.service'
import { getKeys } from '@/utils/object/getKeys'
import { toastError } from '@/utils/toast-error'
import { toastr } from 'react-redux-toastr'
import { getAdminUrl } from '@/config/url.config'

import { IActorEditInput } from './actor-edit.interface'
import { ActorService } from '@/services/actor.service'


export const useActorEdit = (setValue: UseFormSetValue<IActorEditInput>) => {

	const { push } = useRouter()


	const queryParam = useParams()
	const actorId = String(queryParam.id)


	const { isLoading } = useQuery({
		queryKey: ['actor', actorId],
		queryFn: () => ActorService.getById(actorId),
		onSuccess: ({ data }) => {
			getKeys(data).forEach((key) => {
				setValue(key, data[key])
			})
		},
		onError: (error) => {
			toastError(error, 'Get actor')
		},
		enabled: !!queryParam.id,
	})


	const { mutateAsync } = useMutation({
		mutationKey: ['update actor'],
		mutationFn: (data: IActorEditInput) =>
			ActorService.updateActor(actorId, data),
		onError: (error) => {
			toastError(error, 'Update actor')
		},
		onSuccess: () => {
			toastr.success('Update actor', 'update was successful')
			push(getAdminUrl('actors'))
		},
	})

	
	const onSubmit: SubmitHandler<IActorEditInput> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
