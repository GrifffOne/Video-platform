'use client'

import { FC } from 'react'
import Menu from './Menu'
import { menus } from './menu.data'
import GenreMenu from './genre/GenreMenu'

const MenuContainer: FC = () => {
	return (
		<div>
			<Menu menu={menus[0]} />
			<GenreMenu />
			<Menu menu={menus[1]} />
		</div>
	)
}

export default MenuContainer
