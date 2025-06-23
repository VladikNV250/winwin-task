import { HTMLAttributes, ReactNode } from 'react'

export interface ITypography extends HTMLAttributes<HTMLHeadingElement> {
	readonly className?: string
	readonly children: ReactNode
}
