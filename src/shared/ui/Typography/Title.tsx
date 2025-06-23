import { FC } from 'react'

import clsx from 'clsx'

import { TypographyProps } from './types'

export const Title: FC<TypographyProps> = ({
	children,
	className,
	...props
}) => {
	return (
		<h2
			className={clsx(
				'font-medium text-[40px] leading-none text-primary-text',
				className
			)}
			{...props}
		>
			{children}
		</h2>
	)
}
