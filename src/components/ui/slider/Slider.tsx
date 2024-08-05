import React, { FC } from 'react'
import { ISlide } from './slider.interface'
import { useSlider } from './useSlider'
import styles from './Slider.module.scss'
import SlideArrow from './SlideArrow/SlideArrow'
import { CSSTransition } from 'react-transition-group'
import SlideItem from './SlideItem'

interface ISlider {
	buttonTitle?: string
	slides: ISlide[]
}


const Slider: FC<ISlider> = ({ buttonTitle, slides }) => {
	const nodeRef = React.useRef(null)

	const { handleClick, index, isNext, isPrev, slideIn } = useSlider(
		slides.length
	)

	return (
		<div className={styles.slider}>
			{isPrev && (
				<SlideArrow variant="left" clickHandler={() => handleClick('prev')} />
			)}

			<CSSTransition
				nodeRef={nodeRef}
				in={slideIn} 
				timeout={300}
				classNames="slide-animation" 
				unmountOnExit 
			>
				<SlideItem
					nodeRef={nodeRef}
					slide={slides[index]}
					buttonTitle={buttonTitle}
				/>
			</CSSTransition>

			{isNext && (
				<SlideArrow variant="right" clickHandler={() => handleClick('next')} />
			)}
		</div>
	)
}

export default Slider
