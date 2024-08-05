import { TypeComponentAuthFields } from '@/shared/types/auth.types'
import { FC, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useAuth } from '@/hooks/useAuth'
import { useActions } from '@/hooks/useActions'
import { usePathname } from 'next/navigation'


const AuthProviderMain: FC<{ children: React.ReactNode }> = ({ children }) => {

	const { user } = useAuth()


	const { checkAuth, logout } = useActions()


	const pathname = usePathname()


	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		if (accessToken) checkAuth()
	}, [])


	useEffect(() => {
		const refreshToken = Cookies.get('refreshToken')
		if (!refreshToken && user) logout()
	}, [pathname])

	return <>{children}</>
}

export default AuthProviderMain
