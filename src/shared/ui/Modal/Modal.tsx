import { FC, ReactNode } from 'react'

interface IModal {
	readonly isOpen: boolean
	readonly children: ReactNode
}

export const Modal: FC<IModal> = ({ isOpen, children }) => {
	return (
		<section
			className={`
				absolute top-0 left-0 w-full min-h-full 
				bg-[#B1B1B1]/30 backdrop-blur-xl flex 
				justify-center items-center 
				${isOpen ? 'flex' : 'hidden'}
			`}
		>
			{children}
		</section>
	)
}
