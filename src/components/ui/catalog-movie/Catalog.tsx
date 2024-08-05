import { FC } from 'react'
import { ICatalog } from './catalog.interface'
import Heading from '../heading/Heading'
import styles from './Catalog.module.scss'
import Description from '../heading/Description'
import GalleryItem from '../gallery/GalleryItem'
import { getMovieUrl } from '@/config/url.config'


const Catalog: FC<ICatalog> = ({ movies, title, description }) => {
	return (
		<>
			<Heading title={title} className={styles.heading} />

			{description && (
				<Description text={description} className={styles.description} />
			)}

			<section className={styles.movies}>
				{movies.map((movie) => (
					<GalleryItem
						key={movie._id}
						item={{
							name: movie.title,
							url: getMovieUrl(movie.slug),
							posterPath: movie.bigPoster,
							content: {
								title: movie.title,
							},
						}}
						variant="horizontal"
					/>
				))}
			</section>
		</>
	)
}

export default Catalog
