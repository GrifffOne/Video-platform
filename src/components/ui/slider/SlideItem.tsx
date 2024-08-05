import { useRouter } from 'next/navigation'
import React, { FC } from 'react'
import { ISlide } from './slider.interface'
import Image from 'next/image'
import styles from './Slider.module.scss'

interface ISlideItem {
	slide: ISlide
	buttonTitle?: string
	nodeRef: any
}


const SlideItem: FC<ISlideItem> = ({ slide, buttonTitle = 'Watch', nodeRef }) => {

	const { push } = useRouter()

	return (
		<div ref={nodeRef} className={styles.slide}>
			{slide.bigPoster && (
				<Image
					height={0}
					width={0}
					fill 
					className={styles.image}
					src={slide.bigPoster}
					alt={slide.title}
					draggable={false} 
					unoptimized 
					priority 
				/>
			)}

			<div className={styles.content}>
				<div className={styles.heading}>{slide.title}</div>
				<div className={styles.subHeading}>{slide.subTitle}</div>
				<button className={styles.button} onClick={() => push(slide.link)}>
					{buttonTitle}
				</button>
			</div>
		</div>
	)
}

export default SlideItem
