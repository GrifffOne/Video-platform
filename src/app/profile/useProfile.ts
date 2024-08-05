import { UserService } from '@/services/user.service'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { IProfileInput } from './profile.interface'
import { getKeys } from '@/utils/object/getKeys'
import { useMutation, useQuery } from 'react-query'
import { toastError } from '@/utils/toast-error'
import { toastr } from 'react-redux-toastr'

export const useProfile = (setValue: UseFormSetValue<IProfileInput>) => {
	const { isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => UserService.getProfile(),
		onSuccess: ({ data }) => {
			setValue('email', data.email)
		},
		onError: (error) => {
			toastError(error, 'Get profile')
		},
	})

	const { mutateAsync } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: IProfileInput) => UserService.updateProfile(data),
		onError: (error) => {
			toastError(error, 'Update profile')
		},
		onSuccess: () => {
			toastr.success('Update profile', 'update was successful')
		},
	})

	const onSubmit: SubmitHandler<IProfileInput> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
