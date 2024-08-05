'use client'

import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { useActorEdit } from './useActorEdit'
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import Heading from '@/components/ui/heading/Heading'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Field from '@/components/ui/form-elements/Field'
import SlugField from '@/components/ui/form-elements/SlugField/SlugField'
import generateSlug from '@/utils/string/generateSlug'
import Button from '@/components/ui/form-elements/Button'

import formStyles from '@/components/ui/form-elements/admin-form.module.scss'

import { IActorEditInput } from './actor-edit.interface'
import UploadField from '@/components/ui/form-elements/UploadField/UploadField'


const ActorEdit: FC = () => {

	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
	} = useForm<IActorEditInput>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useActorEdit(setValue)

	return (
		<>
			<AdminNavigation />
			<Heading title="Edit Movie" />
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register('name', {
									required: 'Name is required!',
								})}
								placeholder="Title"
								error={errors.name}
							/>

							<SlugField
								register={register}
								error={errors.slug}
								generate={() =>
									setValue('slug', generateSlug(getValues('name')))
								}
							/>
						</div>

						<Controller
							control={control}
							name="photo"
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<UploadField
									onChange={onChange}
									image={value}
									error={error}
									folder="actors"
									placeholder="Photo"
								/>
							)}
							rules={{
								required: 'Photo is required',
							}}
						/>

						<Button>Update</Button>
					</>
				)}
			</form>
		</>
	)
}

export default ActorEdit
