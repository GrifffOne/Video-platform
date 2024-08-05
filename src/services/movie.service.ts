import { axiosClassic } from '@/api/interceptors'
import axios from '@/api/interceptors'
import { IMovieEditInput } from '@/app/manage/movies/edit/[id]/movie-edit.interface'

import { getMoviesUrl } from '@/config/api.config'

import { IMovie } from '@/shared/types/movies.types'

export const MovieService = {

	async getMovies(searchTerm?: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(``), {
			params: searchTerm ? { searchTerm } : {},
		})
	},


	async getMostPopularMovies() {
		const { data: movies } = await axiosClassic.get<IMovie[]>(
			getMoviesUrl('/most-popular')
		)

		return movies
	},


	async getById(_id: string) {
		return axios.get<IMovieEditInput>(getMoviesUrl(`/${_id}`))
	},


	async getByGenres(genreIds: string[]) {
		return axios.post<IMovie[]>(getMoviesUrl('/by-genres'), { genreIds })
	},


	async getByActor(actorId: string) {
		return axios.get<IMovie[]>(getMoviesUrl(`/by-actor/${actorId}`))
	},


	async getBySlug(slug: string) {
		return axiosClassic.get<IMovie>(getMoviesUrl(`/by-slug/${slug}`))
	},


	async createMovie() {
		return axios.post<string>(getMoviesUrl(''))
	},


	async deleteMovie(_id: string) {
		return axios.delete<string>(getMoviesUrl(`/${_id}`))
	},


	async updateMovie(_id: string, data: IMovieEditInput) {
		return axios.put<string>(getMoviesUrl(`/${_id}`), data)
	},


	async updateCountOpened(slug: string) {
		return axiosClassic.put(getMoviesUrl('/update-count-opened'), {
			slug,
		})
	},
}
