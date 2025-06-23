import { FC } from 'react'

import { ITypography } from './types'

export const Subtitle: FC<ITypography> = ({
	children,
	className,
	...props
}) => {
	return (
		<h3
			className={`${className || ''} font-medium text-2xl leading-none text-primary-text`}
			{...props}
		>
			{children}
		</h3>
	)
}
