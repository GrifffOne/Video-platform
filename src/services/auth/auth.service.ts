import instance, { axiosClassic } from '@/api/interceptors'
import { API_URL, getAuthUrl } from '@/config/api.config'
import { IAuthResponse, IAuthUserResponse } from '@/store/user/user.interface'
import { removeTokensCookie, saveToStorage } from './auth.helpers'
import Cookies from 'js-cookie'
import { getContentType } from '@/api/api.helpers'
import { toastr } from 'react-redux-toastr'

export const AuthService = {

	async register(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/register'),
			{ email, password }
		)

		if (response.data.accessToken) saveToStorage(response.data)

		return response
	},

	
	async login(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/login'),
			{ email, password }
		)

		if (response.data.accessToken) saveToStorage(response.data)

		return response
	},


	async logout() {
		removeTokensCookie()
		localStorage.removeItem('user')
	},


	async getNewTokens() {
		const refreshToken = Cookies.get('refreshToken')
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/login/access-token'),
			{ refreshToken },
			{ headers: getContentType() }
		)

		if (response.data.accessToken) {
			saveToStorage(response.data)
		}

		return response
	},
}
