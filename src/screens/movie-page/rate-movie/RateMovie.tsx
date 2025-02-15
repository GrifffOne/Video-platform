import { FC } from 'react'
import StarRatingComponent from 'react-star-rating-component'

import { useAuth } from '@/hooks/useAuth'

import styles from './RateMovie.module.scss'
import { useRateMovie } from './useRateMovie'
import AuthButton from '@/components/ui/video-player/auth-placeholder/AuthButton'


const RateMovie: FC<{ slug: string; _id: string }> = ({ slug, _id }) => {

	const { user } = useAuth()


	const { handleClick, isSended, rating } = useRateMovie(_id)

	return (
		<div className={styles.wrapper}>
			<h3>How do you like the movie?</h3>
			<p>Ratings improve recommendations</p>
			{user ? (
				<>
					{isSended ? (
						<div className={styles.thanks}>Thanks for rating!</div>
					) : (
						<StarRatingComponent
							name="star-rating"
							value={rating}
							onStarClick={handleClick}
							emptyStarColor="#4f4f4f"
						/>
					)}
				</>
			) : (
				<AuthButton slug={slug} />
			)}
		</div>
	)
}

export default RateMovie
