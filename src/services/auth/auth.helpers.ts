import { IAuthResponse, ITokens } from '@/store/user/user.interface'
import Cookies from 'js-cookie'


export const saveToStorage = (data: IAuthResponse) => {
	saveTokensCookie(data)
	localStorage.setItem('user', JSON.stringify(data.user))
}


export const saveTokensCookie = (data: ITokens) => {
	Cookies.set('accessToken', data.accessToken)
	Cookies.set('refreshToken', data.refreshToken)
}


export const removeTokensCookie = () => {
	Cookies.remove('accessToken')
	Cookies.remove('refreshToken')
}
