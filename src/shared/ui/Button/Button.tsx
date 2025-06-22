import { FC } from 'react'

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	readonly children: React.ReactNode
	readonly variant?: 'primary' | 'outline'
}

const baseStyles =
	'w-70 h-16 rounded-2xl focus:outline-none transition-colors duration-150 cursor-pointer font-semibold text-base leading-none'

const variantStyles = {
	primary: 'bg-[#FF5F00] text-white hover:bg-[#FF833A]',
	outline:
		'border-2 border-[#B4B4B4] text-[#474747] bg-transparent hover:bg-[#ffe1cf]'
}

export const Button: FC<IButton> = ({
	children,
	variant = 'primary',
	className = '',
	...props
}) => {
	return (
		<button
			className={` ${baseStyles} ${variantStyles[variant]} ${className}`}
			{...props}
		>
			{children}
		</button>
	)
}
