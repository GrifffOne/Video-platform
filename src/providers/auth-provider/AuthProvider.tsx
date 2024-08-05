'use client'

import { TypeComponentAuthFields } from '@/shared/types/auth.types'
import { FC, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useAuth } from '@/hooks/useAuth'
import { useActions } from '@/hooks/useActions'
import { usePathname } from 'next/navigation'

import dynamic from 'next/dynamic'


const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false })


const AuthProvider: FC<TypeComponentAuthFields> = ({
	children,
	Component: { isOnlyAdmin, isOnlyUser },
}) => {

	const { user } = useAuth()


	const { checkAuth, logout } = useActions()

	
	const pathname = usePathname()


	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		if (accessToken) {
			checkAuth()
			
		}
	}, [])


	useEffect(() => {
		const refreshToken = Cookies.get('refreshToken')
		if (!refreshToken && user) logout()
	}, [pathname])

	
	return !isOnlyAdmin && !isOnlyUser ? (
		<>{children}</>
	) : (
		<DynamicCheckRole Component={{ isOnlyAdmin, isOnlyUser }}>
			{children}
		</DynamicCheckRole>
	)
}

export default AuthProvider
