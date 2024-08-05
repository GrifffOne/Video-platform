import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'
import { ISlide } from '@/components/ui/slider/slider.interface'
import { getMoviesUrl } from '@/config/api.config'
import { getActorUrl, getMovieUrl } from '@/config/url.config'
import Home from '@/screens/home/Home'
import {
	getActors,
	getMovies,
	getMoviesPopular,
} from '@/services/actions/slider.actions'

import { IActor, IMovie } from '@/shared/types/movies.types'
import { getGenresList } from '@/utils/movie/getGenresListEach'


const HomePage = async () => {
	let movies: IMovie[] = await getMovies()
	if (!movies) return (movies = [] as IMovie[])

	const slides: ISlide[] = movies.slice(0, 5).map((movie) => ({
		_id: movie._id,
		link: getMoviesUrl(movie.slug),
		bigPoster: movie.bigPoster,
		subTitle: getGenresList(movie.genres),
		title: movie.title,
	}))

	let dataActors: IActor[] = await getActors()
	if (!dataActors) return (dataActors = [] as IActor[])

	const actors: IGalleryItem[] = dataActors.slice(0, 7).map((a) => ({
		name: a.name,
		posterPath: a.photo,
		url: getActorUrl(a.slug),
		content: {
			title: a.name,
			subTitle: `+${a.countMovies} movies`,
		},
	}))

	let dataTrendingMovies: IMovie[] = await getMoviesPopular()

	if (!dataTrendingMovies) {
		return (dataTrendingMovies = [] as IMovie[])
	}

	const trendingMovies: IGalleryItem[] = dataTrendingMovies
		.slice(0, 7)
		.map((m) => ({
			name: m.title,
			posterPath: m.poster,
			url: getMovieUrl(m.slug),
		}))

	return (
		<Home slides={slides} trendingMovies={trendingMovies} actors={actors} />
	)
}

export default HomePage
