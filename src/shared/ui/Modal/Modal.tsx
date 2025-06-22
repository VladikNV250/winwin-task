import { FC, ReactNode } from 'react'

interface IModal {
	readonly isOpen: boolean
	readonly children: ReactNode
	readonly className?: string
}

export const Modal: FC<IModal> = ({ isOpen, children, className }) => {
	return (
		<section
			className={`
				absolute top-0 left-0 w-full min-h-full 
				bg-[#B1B1B1]/30 backdrop-blur-xl
				${isOpen ? 'block' : 'hidden'}
				${className}
			`}
		>
			{children}
		</section>
	)
}
