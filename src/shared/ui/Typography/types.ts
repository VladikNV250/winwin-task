import { HTMLAttributes, ReactNode } from 'react'

export interface TypographyProps extends HTMLAttributes<HTMLHeadingElement> {
	readonly className?: string
	readonly children: ReactNode
}
