import { MovieService } from '@/services/movie.service'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

export const useUpdateCountOpened = (slug: string) => {
	const { mutateAsync } = useMutation({
		mutationKey: ['update count opened'],
		mutationFn: () => MovieService.updateCountOpened(slug),
	})

	useEffect(() => {
		mutateAsync()
	}, [])
}
