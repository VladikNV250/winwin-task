import { FC } from 'react'

import { ITypography } from './types'

export const Title: FC<ITypography> = ({ children, className, ...props }) => {
	return (
		<h2
			className={`${className || ''} font-medium text-[40px] leading-none text-primary-text`}
			{...props}
		>
			{children}
		</h2>
	)
}
