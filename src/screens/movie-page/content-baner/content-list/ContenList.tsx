import { FC, Fragment } from 'react'
import Link from 'next/link'

import styles from './ContentList.module.scss'


export interface ILink {
	_id: string
	link: string
	title: string
}


export interface IContentList {
	name: string
	links: ILink[]
}


const ContentList: FC<IContentList> = ({ name, links }) => {
	return (
		<div className={styles.list}>
			<div className={styles.name}>{name}:</div>
			<div className={styles.links}>
				{links.map(({ link, title, _id }, idx) => (
					<Fragment key={_id}>
						<Link href={link}>
							{title}
						</Link>
						{idx + 1 !== links.length ? ', ' : ''}
					</Fragment>
				))}
			</div>
		</div>
	)
}

export default ContentList
