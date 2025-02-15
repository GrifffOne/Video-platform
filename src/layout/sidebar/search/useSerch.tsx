
import { useDebounce } from '@/hooks/useDebounce'
import { MovieService } from '@/services/movie.service'
import { ChangeEvent, useState } from 'react'
import { useQuery } from 'react-query'


export const useSearch = () => {
	const [searchTerm, setSearchTerm] = useState('') 

	const debouncedSearch = useDebounce(searchTerm, 500)

	const { isSuccess, data } = useQuery({
		queryKey: ['search movie list', debouncedSearch],
		queryFn: () => MovieService.getMovies(debouncedSearch),
		select: ({ data }) => data,
		enabled: !!debouncedSearch,
	})

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	return { isSuccess, data, handleSearch, searchTerm }
}
