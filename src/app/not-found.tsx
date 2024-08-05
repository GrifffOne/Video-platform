import Heading from '@/components/ui/heading/Heading'
import { NO_INDEX_PAGE } from '@/utils/meta/seo.constans'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Page not found',
	...NO_INDEX_PAGE,
	openGraph: null,
	alternates: {
		canonical: 'not-found',
	},
}

export default function Error404() {
	return <Heading title="404-Page Not Found" className="text-center-page" />
}
