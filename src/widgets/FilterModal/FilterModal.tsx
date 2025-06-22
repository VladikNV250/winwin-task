import { FC, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useQuery } from '@tanstack/react-query'

import { getFilters } from '@/shared/api/Filter'
import {
	Button,
	Checkbox,
	CloseIcon,
	Loader,
	Modal,
	Subtitle,
	Title
} from '@/shared/ui'

import { ConfirmModal } from '../ConfirmModal/ConfirmModal'

interface IFilterModal {
	readonly isOpen: boolean
	readonly onClose: () => void
}

export const FilterModal: FC<IFilterModal> = ({ isOpen, onClose }) => {
	const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
	const { t } = useTranslation()
	const { data, isLoading } = useQuery({
		queryKey: ['filters'],
		queryFn: getFilters
	})

	const closeConfirmModal = useCallback(() => setIsOpenConfirmModal(false), [])
	const openConfirmModal = useCallback(() => setIsOpenConfirmModal(true), [])
	const closeModals = useCallback(() => {
		onClose()
		closeConfirmModal()
	}, [])

	const saveChanges = useCallback(() => {
		console.log("Changes Saved!")
		closeModals()
	}, [])

	return (
		<Modal
			isOpen={isOpen}
			className={isOpenConfirmModal ? 'backdrop-blur-none!' : ''}
		>
			<div className="size-full p-20">
				<ConfirmModal
					isOpen={isOpenConfirmModal}
					onClose={closeConfirmModal}
					onCancel={closeModals}
					onConfirm={saveChanges}
				/>
				<section className="size-full bg-white rounded-2xl px-8 py-10">
					<header className="w-full h-12 grid grid-cols-[1fr_auto_1fr] items-center justify-items-end">
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
					{isLoading ? (
						<div className="flex items-center justify-center my-12">
							<Loader />
						</div>
					) : (
						<form action="">
							{data?.filterItems.map(filterItem => (
								<article key={filterItem.id}>
									<hr className="border-t-0 h-0.5 bg-[#B4B4B4] rounded-xs mt-6 mb-8" />
									<Subtitle className="mb-6">{t(filterItem.name)}</Subtitle>
									<div className={`grid grid-cols-3 gap-y-5`}>
										{filterItem.options.map(option => (
											<Checkbox
												key={option.id}
												id={option.id}
												label={option.name}
											/>
										))}
									</div>
								</article>
							))}
						</form>
					)}
					<section>
						<hr className="border-t-0 h-0.5 bg-[#B4B4B4] rounded-xs mt-6 mb-8" />
						<div className="w-full grid grid-cols-[1fr_auto_1fr] items-center justify-items-end">
							<div />
							<Button
								size="sm"
								onClick={openConfirmModal}
							>
								{t('Apply')}
							</Button>
							<button className="font-medium text-base text-[#078691] underlined leading-none">
								{t('Clear all parameters')}
							</button>
						</div>
					</section>
				</section>
			</div>
		</Modal>
	)
}
