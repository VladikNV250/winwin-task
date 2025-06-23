import { FC } from 'react'

import clsx from 'clsx'

import { TypographyProps } from './types'

export const Subtitle: FC<TypographyProps> = ({
	children,
	className,
	...props
}) => {
	return (
		<h3
			className={clsx(
				'font-medium text-2xl leading-none text-primary-text',
				className
			)}
			{...props}
		>
			{children}
		</h3>
	)
}
