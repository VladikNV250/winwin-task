import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

import clsx from 'clsx'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	readonly children: ReactNode
	readonly variant?: 'primary' | 'outline'
	readonly size?: 'md' | 'sm'
}

const baseStyles =
	'rounded-2xl focus:outline-none transition-colors duration-150 cursor-pointer font-semibold text-base leading-none'

const variantStyles = {
	primary: 'bg-brand-500 text-white hover:bg-brand-400',
	outline:
		'border-2 border-secondary-text text-[#474747] bg-transparent hover:bg-brand-50'
}

const sizeStyles = {
	md: 'w-70 h-16',
	sm: 'w-46 h-16'
}

export const Button: FC<ButtonProps> = ({
	children,
	variant = 'primary',
	size = 'md',
	className = '',
	type = 'button',
	...props
}) => {
	return (
		<button
			type={type}
			className={clsx(
				baseStyles,
				variantStyles[variant],
				sizeStyles[size],
				className
			)}
			{...props}
		>
			{children}
		</button>
	)
}
