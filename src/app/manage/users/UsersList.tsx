'use client'

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'
import Heading from '@/components/ui/heading/Heading'
import { FC } from 'react'
import { useUsers } from './useUsers'
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable'


const UsersList: FC = () => {
	const { handleSearch, isLoading, searchTerm, data, deleteAsync } = useUsers()
	return (
		<>
			<AdminNavigation />
			<Heading title="Users" />
			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />

			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Email', 'Date register']}
				tableItems={data || []}
			/>
		</>
	)
}

export default UsersList
