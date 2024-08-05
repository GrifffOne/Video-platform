import { getUsersUrl } from '@/config/api.config'
import { IUser } from '@/shared/types/user.types'
import { IProfileInput } from '@/app/profile/profile.interface'
import axios from '@/api/interceptors'
import { IMovie } from '@/shared/types/movies.types'

export const UserService = {

	async getAll(searchTerm?: string) {
		return axios.get<IUser[]>(getUsersUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		})
	},

	
	async getProfile() {
		return axios.get<IUser>(getUsersUrl('/profile'))
	},


	async updateProfile(data: IProfileInput) {
		return axios.put<string>(getUsersUrl('/profile'), data)
	},

	
	async getUser(_id: string) {
		return axios.get<IUser>(getUsersUrl(`/${_id}`))
	},


	async updateUser(_id: string, data: IProfileInput) {
		return axios.put<string>(getUsersUrl(`/${_id}`), data)
	},


	async deleteUser(_id: string) {
		return axios.delete<string>(getUsersUrl(`/${_id}`))
	},


	async getFavoriteMovies() {
		return axios.get<IMovie[]>(getUsersUrl('/profile/favorites'))
	},


	async toggleFavoriteMovies(movieId: string) {
		return axios.put<IMovie>(getUsersUrl('/profile/favorites'), { movieId })
	},
}
