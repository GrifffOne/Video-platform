'use client'

import Heading from '@/components/ui/heading/Heading'
import { FC } from 'react'
import Statistics from './statistics/Statistics'
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'

const Admin: FC = () => {
	return (
		<>
			<AdminNavigation />
			<Heading title="Some statistics" />
			<Statistics />
		</>
	)
}

export default Admin
