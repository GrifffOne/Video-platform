import { FC } from 'react'
import { INavItem } from './admin-navigation.interface'
import { usePathname } from 'next/navigation'

import cn from 'classnames'
import styles from './AdminNavigation.module.scss'
import Link from 'next/link'


const AdminNavItem: FC<{ item: INavItem }> = ({ item: { title, link } }) => {
	const pathname = usePathname()
	return (
		<li>
			<Link
				className={cn({
					[styles.active]: pathname === link,
				})}
				href={link}
			>
				{title}
			</Link>
		</li>
	)
}

export default AdminNavItem
