'use client'

import { FC } from 'react'

import cn from 'classnames'
import styles from './Menu.module.scss'

import { IMenuItem } from './menu.interface'
import Link from 'next/link'
import MaterialIcon from '@/components/ui/MaterialIcon'
import { usePathname } from 'next/navigation'

const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {

	const pathname = usePathname()


	return (
		<li
			className={cn({
				[styles.active]: pathname === item.link,
			})}
		>
			<Link href={item.link}>
				<MaterialIcon name={item.icon} />
				<span>{item.title}</span>
			</Link>
		</li>
	)
}

export default MenuItem
