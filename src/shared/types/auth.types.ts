


export type TypeRoles = { isOnlyAdmin?: boolean; isOnlyUser?: boolean }


export type NextPageAuth = JSX.Element & TypeRoles


export type TypeComponentAuthFields = {
	children: React.ReactNode
	Component: TypeRoles
}
