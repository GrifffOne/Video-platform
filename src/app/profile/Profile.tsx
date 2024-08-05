'use client'

import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { IProfileInput } from './profile.interface'
import { useProfile } from './useProfile'
import Heading from '@/components/ui/heading/Heading'
import styles from './Profile.module.scss'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import AuthFields from '../auth/AuthFields'
import Button from '@/components/ui/form-elements/Button'


const Profile: FC = () => {
	const { handleSubmit, register, formState, setValue } =
		useForm<IProfileInput>({
			mode: 'onChange',
		})

	const { isLoading, onSubmit } = useProfile(setValue)

	return (
		<>
			<Heading title="Profile" />
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				{isLoading ? (
					<SkeletonLoader count={2} />
				) : (
					<AuthFields
						register={register}
						formState={formState}
						isPasswordRequired={false}
					/>
				)}

				<Button>Update</Button>
			</form>
		</>
	)
}

export default Profile
