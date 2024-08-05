import Description from '@/components/ui/heading/Description'
import Heading from '@/components/ui/heading/Heading'
import { FC } from 'react'

import styles from './Collections.module.scss'
import { ICollection } from './collections.interface'
import CollectionItem from './CollectionItem'

const description = 'In this section you will find all genres on our site'
const title = 'Discovery'


const Collections: FC<{ collections: ICollection[] }> = ({ collections }) => {
	return (
		<>
			<Heading title={title} className={styles.heading} />
			<Description text={description} className={styles.description} />

			<section className={styles.collections}>
				{collections.map((collection) => (
					<CollectionItem key={collection._id} collection={collection} />
				))}
			</section>
		</>
	)
}

export default Collections
