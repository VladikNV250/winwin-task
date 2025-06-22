import { FC } from 'react'

import { ITypography } from './types'

export const Subtitle: FC<ITypography> = ({ children, className }) => {
	return (
		<h2
			className={`${className} font-medium text-2xl leading-none text-[#31393C]`}
		>
			{children}
		</h2>
	)
}
