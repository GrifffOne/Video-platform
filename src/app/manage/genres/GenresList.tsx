'use client'

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'
import Heading from '@/components/ui/heading/Heading'
import { FC } from 'react'

import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable'
import { useGenres } from './useGenres'


const GenresList: FC = () => {

	const {
		handleSearch,
		isLoading,
		searchTerm,
		data,
		deleteAsync,
		createAsync,
	} = useGenres()
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
				headerItems={['Name', 'Slug']}
				tableItems={data || []}
			/>
		</>
	)
}

export default GenresList
