import { FC } from 'react'
import { IUploadField } from '../form.interface'
import { useUpload } from './useUpload'

import styles from '../Form.module.scss'
import cn from 'classnames'
import SkeletonLoader from '../../SkeletonLoader'
import Image from 'next/image'


const UploadField: FC<IUploadField> = ({
	onChange,
	placeholder,
	error,
	folder,
	isNoImage = false,
	style,
	image,
}) => {
	const { isLoading, uploadFile } = useUpload(onChange, folder)
	return (
		<div className={cn(styles.field, styles.uploadField)} style={style}>
			<div className={styles.uploadFlex}>
				<label>
					<span>{placeholder}</span>
					<input type="file" onChange={uploadFile} />
					{error && <div className={styles.error}>{error.message}</div>}
				</label>
				{!isNoImage && (
					<div className={styles.uploadImageContainer}>
						{isLoading ? (
							<SkeletonLoader count={1} className="w-full h-full" />
						) : (
							image && <Image src={image} alt="" fill unoptimized />
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default UploadField
