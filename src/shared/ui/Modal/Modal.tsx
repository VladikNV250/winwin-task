import { FC, ReactNode } from 'react'

interface IModal {
	readonly isOpen: boolean
	readonly children: ReactNode
	readonly titleId: string
	readonly className?: string
}

export const Modal: FC<IModal> = ({ isOpen, children, titleId, className }) => {
	if (!isOpen) {
		return null
	}

	return (
		<div
			role="dialog"
			aria-modal="true"
			aria-labelledby={titleId} // The ID of the title element inside the modal
			className={`
				absolute top-0 left-0 w-full min-h-full
				bg-modal/30 backdrop-blur-xl
				${className || ''}
			`}
		>
			{children}
		</div>
	)
}
