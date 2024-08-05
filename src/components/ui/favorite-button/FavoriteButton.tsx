import cn from 'classnames'
import { FC, useEffect, useState } from 'react'
import { useMutation } from 'react-query'

import styles from './FavoriteButton.module.scss'
import HeartImage from './heart-animation.png'
import { useFavoriteMovies } from '@/app/favorites/useFavoriteMovie'
import { useAuth } from '@/hooks/useAuth'
import { UserService } from '@/services/user.service'
import { toastError } from '@/utils/toast-error'


const FavoriteButton: FC<{ movieId: string }> = ({ movieId }) => {
	const { user } = useAuth()

	if (!user) return null

	const [isSmashed, setIsSmashed] = useState(false)

	const { favoriteMovies, refetch } = useFavoriteMovies(user)

	useEffect(() => {
		if (favoriteMovies) {
			const isHasMovie = favoriteMovies.some((movie) => movie._id === movieId)
			if (isSmashed !== isHasMovie) setIsSmashed(isHasMovie)
		}
	}, [favoriteMovies, isSmashed, movieId])

	const { mutateAsync } = useMutation({
		mutationKey: ['update favorite list'],
		mutationFn: () => UserService.toggleFavoriteMovies(movieId),
		onError: (error) => {
			toastError(error, 'Update favorite list')
		},
		onSuccess: () => {
			setIsSmashed(!isSmashed)
			refetch()
		},
	})

	return (
		<button
			onClick={() => mutateAsync()}
			className={cn(styles.button, {
				[styles.animate]: isSmashed,
			})}
			style={{ backgroundImage: `url(${HeartImage.src})` }}
		/>
	)
}

export default FavoriteButton
