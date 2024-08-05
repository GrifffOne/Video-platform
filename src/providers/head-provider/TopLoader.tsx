'use client'

import { accentColor } from '@/config/constants'
import NextTopLoader from 'nextjs-toploader'
import React, { FC } from 'react'

const TopLoader: FC = () => {
	return (
		<NextTopLoader
			color={accentColor}
			initialPosition={0.3}
			crawlSpeed={300}
			height={5}
			crawl={true}
			showSpinner={false}
			easing="ease"
			speed={500}
			shadow={false}
		/>
	)
}

export default TopLoader
