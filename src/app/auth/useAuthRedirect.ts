import { useAuth } from '@/hooks/useAuth'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useSearchParams } from 'next/navigation'


export const useAuthRedirect = () => {
	
	const { user } = useAuth()


	const { push } = useRouter()

	const search = useSearchParams().get('redirect')?.toString()

	
	const redirect = search ? search : '/'

	useEffect(() => {
		if (user) push(redirect)
	}, [user, redirect, push])
}
