import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import logoImage from '@/assets/images/logo.svg'

const Logo: FC = () => {
	return (
		<Link href="/" className="px-layout mb-10 block relative">
			<Image
				src={logoImage}
				width={247}
				height={34}
				alt="Cinema"
				draggable={false}
				priority
			/>
			<div className="absolute left-9 top-0 ml-layout text-white text-xl">
				Супер Кино
			</div>
		</Link>
	)
}

export default Logo
