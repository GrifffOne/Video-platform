import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useParams, useRouter } from 'next/navigation'
import { useMutation, useQuery } from 'react-query'

import { toastError } from '@/utils/toast-error'
import { toastr } from 'react-redux-toastr'
import { getAdminUrl } from '@/config/url.config'
import { IUserEditInput } from './user-edit.interface'
import { UserService } from '@/services/user.service'

export const useUserEdit = (setValue: UseFormSetValue<IUserEditInput>) => {
	const { push } = useRouter()

	const queryParam = useParams()
	const userId = String(queryParam.id)

	const { isLoading } = useQuery({
		queryKey: ['genre', userId],
		queryFn: () => UserService.getUser(userId),
		onSuccess: ({ data }) => {
			setValue('email', data.email)
			setValue('isAdmin', data.isAdmin)
		},
		onError: (error) => {
			toastError(error, 'Get user')
		},
		enabled: !!queryParam.id,
	})

	const { mutateAsync } = useMutation({
		mutationKey: ['update user'],
		mutationFn: (data: IUserEditInput) => UserService.updateUser(userId, data),
		onError: (error) => {
			toastError(error, 'Update user')
		},
		onSuccess: () => {
			toastr.success('Update user', 'update was successful')
			push(getAdminUrl('users'))
		},
	})

	const onSubmit: SubmitHandler<IUserEditInput> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
