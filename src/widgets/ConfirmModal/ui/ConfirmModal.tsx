import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, CloseIcon, Modal, Title } from '@/shared/ui'

interface IConfirmModal {
	readonly isOpen: boolean
	readonly onClose: () => void
	readonly onConfirm: () => void
	readonly onCancel: () => void
}

export const ConfirmModal: FC<IConfirmModal> = ({
	isOpen,
	onClose,
	onConfirm,
	onCancel
}) => {
	const { t } = useTranslation()

	return (
		<Modal
			isOpen={isOpen}
			titleId="confirm-modal-title"
			className="p-20 pt-70 z-10"
		>
			<section className="size-full bg-white rounded-2xl px-8 py-10 flex flex-col gap-y-30">
				<header className="w-full h-12 flex items-center justify-between">
					<div className="w-6" />
					<Title id="confirm-modal-title">
						{t('Do you want to apply new filter')}
					</Title>
					<button
						className="cursor-pointer"
						onClick={onClose}
						aria-label={t('Close confirmation modal')}
					>
						<CloseIcon
							width="24"
							height="24"
							color="#31393C"
						/>
					</button>
				</header>
				<footer className="w-full flex items-center justify-center gap-x-8">
					<Button
						variant="outline"
						onClick={onCancel}
					>
						{t('Use old filter')}
					</Button>
					<Button
						variant="primary"
						onClick={onConfirm}
					>
						{t('Apply new filter')}
					</Button>
				</footer>
			</section>
		</Modal>
	)
}
