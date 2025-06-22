import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Checkbox, CloseIcon, Modal, Subtitle, Title } from '@/shared/ui'

interface IFilterModal {
	readonly isOpen: boolean
	readonly onClose: () => void
}

export const FilterModal: FC<IFilterModal> = ({ isOpen, onClose }) => {
	const { t } = useTranslation()

	return (
		<Modal isOpen={isOpen}>
			<div className="size-full p-20">
				<section className="size-full bg-white rounded-2xl px-8 py-10">
					<header className="w-full h-12 flex items-center justify-between">
						<div />
						<Title>{t('Filter')}</Title>
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
					<article>
						<hr className="border-t-0 h-0.5 bg-[#B4B4B4] rounded-xs mt-6 mb-8" />
						<Subtitle className="mb-6">{t('Preliminary filter')}</Subtitle>
						<div className={`grid grid-cols-3 gap-y-5`}>
							<Checkbox label="Distance to the center 1 km" />
							<Checkbox label="Distance to the center 2 km" />
							<Checkbox label="Distance to the center 3 km" />
							<Checkbox label="Distance to the center 4 km" />
							<Checkbox label="Distance to the center 5 km" />
							<Checkbox label="Distance to the center 6 km" />
						</div>
					</article>
				</section>
			</div>
		</Modal>
	)
}
