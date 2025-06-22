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
			className="z-10"
		>
			<div className="w-full min-h-full p-20 pt-70">
				<section className="size-full bg-white rounded-2xl px-8 py-10">
					<header className="w-full h-12 flex items-center justify-between mb-30">
						<div className="w-6" />
						<Title>{t('Do you want to apply new filter')}</Title>
						<button
							className="cursor-pointer"
							onClick={onClose}
						>
							<CloseIcon
								width="24"
								height="24"
								color="#31393C"
							/>
						</button>
					</header>
					<section className="w-full flex items-center justify-center gap-x-8">
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
					</section>
				</section>
			</div>
		</Modal>
	)
}
