import { NextRequest, NextResponse } from 'next/server'

import { EnumTokens } from './config/constants'
import { errorCatch, getContentType } from './api/api.helpers'
import { toastr } from 'react-redux-toastr'
import { axiosClassic } from './api/interceptors'
import { IAuthUserResponse } from './store/user/user.interface'
import { getAuthUrl } from './config/api.config'

export async function middleware(request: NextRequest, response: NextResponse) {
	const { url, cookies } = request

	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value

	const isAuthPage = url.includes('/auth')
	const isAdminPage = url.includes('/manage')

	if (isAuthPage && refreshToken) {
		return NextResponse.redirect(new URL('/', url))
	}

	if (isAuthPage) {
		return NextResponse.next()
	}

	if (!refreshToken && !isAdminPage) {
		return NextResponse.redirect(new URL('/auth', request.url))
	}

	async function getUserAdminAxios() {
		const response = await axiosClassic.post<IAuthUserResponse>(
			getAuthUrl('/user-status'),
			{ refreshToken },
			{ headers: getContentType() }
		)
		return response
	}

	async function getUserAdmin() {
		try {
			const response = await getUserAdminAxios()

			return response.data.user.isAdmin
		} catch (error) {
			if (errorCatch(error) === 'Invalid token or expired') {
				toastr.error('User Status', 'You do not have admin rights!')
			}
		}
	}

	const isAdmin = await getUserAdmin().then((res) => res)

	if (isAdminPage && !isAdmin) {
		return NextResponse.redirect(new URL('/404', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/profile/:path*', '/manage/:path*'],
}
