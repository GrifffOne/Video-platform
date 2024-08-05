'use client'

import { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import ReduxToast from './ReduxToast'
import { Provider } from 'react-redux'
import { store } from '@/store/store'

import AuthProviderMain from './auth-provider/AuthProviderMain'


const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

const MainProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<ReduxToast />
				<AuthProviderMain>{children}</AuthProviderMain>
			</QueryClientProvider>
		</Provider>
	)
}

export default MainProviders
