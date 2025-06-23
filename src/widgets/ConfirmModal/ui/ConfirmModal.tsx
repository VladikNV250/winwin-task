import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { DialogPanel } from '@headlessui/react'

import { useModalStore } from '@/shared/model'
import { Button, CloseIcon, Modal, Title } from '@/shared/ui'

interface ConfirmModalProps {
	readonly onConfirm: () => void
	readonly onCancel: () => void
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
	onConfirm,
	onCancel
}) => {
	const { t } = useTranslation()
	const isOpen = useModalStore(state => state.modals['confirm-modal'] || false)
	const closeModal = useModalStore(state => state.closeModal)

	return (
		<Modal
			isOpen={isOpen}
			onClose={() => closeModal('confirm-modal')}
			className="p-20 pt-70"
		>
			<DialogPanel className="w-full space-y-30 rounded-2xl bg-white px-8 py-10">
				<header className="w-full h-12 flex items-center justify-between">
					<div className="w-6" />
					<Title id="confirm-modal-title">
						{t('filter:do-you-want-to-apply-new-filter')}
					</Title>
					<button
						className="cursor-pointer"
						onClick={() => closeModal('confirm-modal')}
						aria-label={t('filter:close-confirmation-modal')}
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
						{t('filter:use-old-filter')}
					</Button>
					<Button
						variant="primary"
						onClick={onConfirm}
					>
						{t('filter:apply-new-filter')}
					</Button>
				</footer>
			</DialogPanel>
		</Modal>
	)
}
