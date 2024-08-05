'use client'

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'
import Heading from '@/components/ui/heading/Heading'
import { FC } from 'react'

import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable'
import { useActors } from './useActors'


const ActorsList: FC = () => {

	const {
		handleSearch,
		isLoading,
		searchTerm,
		data,
		deleteAsync,
		createAsync,
	} = useActors()
	return (
		<>
			<AdminNavigation />
			<Heading title="Users" />
			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>

			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Name', 'Count Movies']}
				tableItems={data || []}
			/>
		</>
	)
}

export default ActorsList
