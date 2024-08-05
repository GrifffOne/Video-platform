'use client'

import { FC } from 'react'
import NextProgressBar from 'nextjs-progressbar'
import { accentColor } from '@/config/constants'

const HeadProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<>
			<NextProgressBar
				color={accentColor}
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
			/>

			{children}
		</>
	)
}

export default HeadProvider
