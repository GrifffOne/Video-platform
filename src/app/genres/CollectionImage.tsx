import Image from 'next/image'
import { FC } from 'react'
import { ICollection } from './collections.interface'


const CollectionImage: FC<{ collection: ICollection }> = ({
	collection: { image, title },
}) => {
	return <Image alt={title} src={image} sizes="100%" draggable={false} fill />
}

export default CollectionImage
