import { FC } from 'react'
import { IGalleryItemProps } from './gallery.interface'
import cn from 'classnames'
import styles from './Gallery.module.scss'
import Image from 'next/image'
import Link from 'next/link'


const GalleryItem: FC<IGalleryItemProps> = ({ item, variant }) => {
	return (
		<Link
			href={item.url}
			className={cn(styles.item, {
				[styles.withText]: item.content,
				[styles.horizontal]: variant === 'horizontal',
				[styles.vertical]: variant === 'vertical',
			})}
		>
			<Image
				alt={item.name}
				src={item.posterPath}
				fill
				draggable={false}
				priority
				sizes='100%'
			/>
			{item.content && (
				<div className={styles.content}>
					<div className={styles.title}>{item.content.title}</div>
					{item.content.subTitle && (
						<div className={styles.subTitle}> {item.content.subTitle}</div>
					)}
				</div>
			)}
		</Link>
	)
}

export default GalleryItem
