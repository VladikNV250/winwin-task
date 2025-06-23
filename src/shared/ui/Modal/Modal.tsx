import { FC, ReactNode } from 'react'

import { Dialog } from '@headlessui/react'
import clsx from 'clsx'

interface ModalProps {
	readonly isOpen: boolean
	readonly onClose: () => void
	readonly children: ReactNode
	readonly className?: string
}

export const Modal: FC<ModalProps> = ({
	isOpen,
	onClose,
	children,
	className
}) => {
	if (!isOpen) {
		return null
	}

	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
			className="relative z-50"
		>
			<div
				className={clsx(
					'fixed top-0 inset-0 flex overflow-y-auto w-screen',
					'justify-center items-start bg-modal/30 backdrop-blur-xl',
					className
				)}
			>
				{children}
			</div>
		</Dialog>
	)
}
