import { axiosClassic } from '@/api/interceptors'
import axios from '@/api/interceptors'

import { getGenresUrl } from '@/config/api.config'
import { IGenre } from '@/shared/types/movies.types'
import { IGenreEditInput } from '@/app/manage/genres/edit/[id]/genre-edit.interface'
import { ICollection } from '@/app/genres/collections.interface'

export const GenreService = {

	async getAll(searchTerm?: string) {
		return axiosClassic.get<IGenre[]>(getGenresUrl(''), {
			params: searchTerm
				? {
						searchTerm,
					}
				: {},
		})
	},


	async deleteGenre(_id: string) {
		return axios.delete<string>(getGenresUrl(`/${_id}`))
	},

	
	async getById(_id: string) {
		return axios.get<IGenreEditInput>(getGenresUrl(`/${_id}`))
	},


	async createGenre() {
		return axios.post<string>(getGenresUrl('/'))
	},


	async updateGenre(_id: string, data: IGenreEditInput) {
		return axios.put<string>(getGenresUrl(`/${_id}`), data)
	},


	async getBySlug(slug: string) {
		return axiosClassic.get<IGenre>(getGenresUrl(`/by-slug/${slug}`))
	},


}

