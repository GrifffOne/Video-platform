import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import './globals.scss'
import MainProviders from '@/providers/MainProviders'
import { SITE_NAME } from '@/utils/meta/seo.constans'
import TopLoader from '@/providers/head-provider/TopLoader'

const zen = Noto_Sans({
	subsets: ['cyrillic', 'latin'],
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
	variable: '--font-zen',
	style: ['normal'],
})

export const metadata: Metadata = {
	metadataBase: new URL(`${process.env.APP_URL}`),
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`,
	},
	description: 'Best one for cinema from Johnny White',
	openGraph: {},
	alternates: {
		canonical: '/',
	},
	manifest: '/manifest.json',
}

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={zen.className}>
				<TopLoader />
				<MainProviders>{children}</MainProviders>
			</body>
		</html>
	)
}
