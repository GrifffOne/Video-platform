'use client'

import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { useMovieEdit } from './useMovieEdit'
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import Heading from '@/components/ui/heading/Heading'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Field from '@/components/ui/form-elements/Field'
import SlugField from '@/components/ui/form-elements/SlugField/SlugField'
import generateSlug from '@/utils/string/generateSlug'
import Button from '@/components/ui/form-elements/Button'

import formStyles from '@/components/ui/form-elements/admin-form.module.scss'

import dynamic from 'next/dynamic'
import { IMovieEditInput } from './movie-edit.interface'
import UploadField from '@/components/ui/form-elements/UploadField/UploadField'
import { useAdminActors } from './useAdminActors'
import { useAdminGenres } from './useAdminGenres'


const DynamicSelect = dynamic(() => import('@/components/ui/select/Select'), {
	ssr: false,
})


const MovieEdit: FC = () => {

	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
	} = useForm<IMovieEditInput>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useMovieEdit(setValue)


	const { isLoading: isActorsLoading, data: actors } = useAdminActors()
	const { isLoading: isGenresLoading, data: genres } = useAdminGenres()

	return (
		<>
			<AdminNavigation />
			<Heading title="Edit Movie" />
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading ? (
					<SkeletonLoader count={5} />
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register('title', {
									required: 'Title is required!!',
								})}
								placeholder="Title"
								error={errors.title}
							/>

							<SlugField
								register={register}
								error={errors.slug}
								generate={() =>
									setValue('slug', generateSlug(getValues('title')))
								}
							/>

							<Field
								{...register('parameters.country', {
									required: 'Country is required!',
								})}
								placeholder="Country"
								error={errors.parameters?.country}
								style={{ width: '31%' }} 
							/>

							<Field
								{...register('parameters.duration', {
									required: 'Duration is required!',
								})}
								placeholder="Duration (min.)"
								error={errors.parameters?.duration}
								style={{ width: '31%' }}
							/>

							<Field
								{...register('parameters.year', {
									required: 'Year is required!',
								})}
								placeholder="Year"
								error={errors.parameters?.year}
								style={{ width: '31%' }}
							/>

							<Controller
								name="genres"
								control={control}
								rules={{
									required: 'Please select at least one genre!',
								}}
								render={({ field, fieldState: { error } }) => (
									<DynamicSelect
										error={error}
										field={field}
										placeholder="Genres"
										options={genres || []}
										isLoading={isGenresLoading}
										isMulti
									/>
								)}
							/>
							<Controller
								name="actors"
								control={control}
								rules={{
									required: 'Please select at least one actor!',
								}}
								render={({ field, fieldState: { error } }) => (
									<DynamicSelect
										error={error}
										field={field}
										placeholder="Actors"
										options={actors || []}
										isLoading={isActorsLoading}
										isMulti
									/>
								)}
							/>

							<Controller
								control={control}
								name="poster"
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										onChange={onChange}
										image={value}
										error={error}
										folder="movies"
										placeholder="Poster"
									/>
								)}
								rules={{
									required: 'Poster is required',
								}}
							/>

							<Controller
								control={control}
								name="bigPoster"
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										onChange={onChange}
										image={value}
										error={error}
										folder="movies"
										placeholder="Big Poster"
									/>
								)}
								rules={{
									required: 'Big poster is required',
								}}
							/>

							<Controller
								control={control}
								name="videoUrl"
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										onChange={onChange}
										image={value}
										error={error}
										folder="movies"
										placeholder="Video"
										style={{ marginTop: -25 }}
										isNoImage
									/>
								)}
								rules={{
									required: 'Video poster is required',
								}}
							/>
						</div>

						<Button>Update</Button>
					</>
				)}
			</form>
		</>
	)
}

export default MovieEdit
