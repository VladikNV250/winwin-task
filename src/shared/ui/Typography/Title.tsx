import { FC } from 'react'

import { ITypography } from './types'

export const Title: FC<ITypography> = ({ children, className }) => {
	return (
		<h1
			className={`${className} font-medium text-[40px] leading-none text-[#31393C]`}
		>
			{children}
		</h1>
	)
}
