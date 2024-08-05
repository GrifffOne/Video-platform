'use client'

import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import Heading from '@/components/ui/heading/Heading'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

import Button from '@/components/ui/form-elements/Button'

import formStyles from '@/components/ui/form-elements/admin-form.module.scss'

import { IUserEditInput } from './user-edit.interface'
import { useUserEdit } from './useUserEdit'
import AuthFields from '@/app/auth/AuthFields'


const UserEdit: FC = () => {
	const { handleSubmit, register, setValue, formState, control } =
		useForm<IUserEditInput>({
			mode: 'onChange',
		})

	const { isLoading, onSubmit } = useUserEdit(setValue)

	return (
		<>
			<AdminNavigation />
			<Heading title="Edit User" />
			<form onSubmit={handleSubmit(onSubmit)} className="admin-form">
				{isLoading ? (
					<SkeletonLoader count={2} />
				) : (
					<>
						<AuthFields
							register={register}
							formState={formState}
							isPasswordRequired={false}
						/>

						<Controller
							name="isAdmin"
							control={control}
							render={({ field }) => (
								<button
									onClick={(e) => {
										e.preventDefault()
										field.onChange(!field.value)
									}}
									className="text-link block mb-7"
								>
									{field.value ? 'Make it regular user' : 'Make it admin'}
								</button>
							)}
						/>
					</>
				)}
				<Button>Update</Button>
			</form>
		</>
	)
}

export default UserEdit
