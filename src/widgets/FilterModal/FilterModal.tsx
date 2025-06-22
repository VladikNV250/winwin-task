import { FC, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useQuery } from '@tanstack/react-query'

import { useFilterStore } from '@/entities/filter'
import { getFilters } from '@/shared/api/Filter'
import { FilterType, SearchRequestFilter } from '@/shared/api/types'
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
	const selectedFilters = useFilterStore(state => state.selectedFilters)
	const setFilters = useFilterStore(state => state.setFilters)
	const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
	const [selectedFormFilters, setSelectedFormFilters] =
		useState<SearchRequestFilter>([])
	const { t } = useTranslation()
	const { data, isLoading } = useQuery({
		queryKey: ['filters'],
		queryFn: getFilters
	})

	useEffect(() => {
		setSelectedFormFilters(selectedFilters)
	}, [selectedFilters])

	const closeConfirmModal = useCallback(() => setIsOpenConfirmModal(false), [])
	const openConfirmModal = useCallback(() => setIsOpenConfirmModal(true), [])
	const closeModals = useCallback(() => {
		onClose()
		closeConfirmModal()
		setSelectedFormFilters(selectedFilters)
	}, [selectedFilters, closeConfirmModal, onClose])

	const saveChanges = useCallback(() => {
		setFilters(selectedFormFilters)
		closeModals()
	}, [selectedFormFilters, closeModals, setFilters])

	const checkFilter = (filterId: string, optionId: string): boolean => {
		const existingFilter = selectedFormFilters.find(
			item => item.id === filterId
		)
		if (existingFilter) {
			const isSelected = existingFilter.optionsIds.includes(optionId)

			return isSelected
		}
		return false
	}

	const selectFilter = (filterId: string, optionId: string) => {
		const existingFilter = selectedFormFilters.find(
			item => item.id === filterId
		)

		if (existingFilter) {
			const isSelected = existingFilter.optionsIds.includes(optionId)

			const updatedFilter: SearchRequestFilter[number] = {
				...existingFilter,
				optionsIds: isSelected
					? existingFilter.optionsIds.filter(id => id !== optionId)
					: [...existingFilter.optionsIds, optionId]
			}

			const newFilters = selectedFormFilters.map(filter =>
				filter.id === filterId ? updatedFilter : filter
			)

			setSelectedFormFilters(newFilters)
		} else {
			const newFilter: SearchRequestFilter[number] = {
				id: filterId,
				optionsIds: [optionId],
				type: FilterType.OPTION
			}
			setSelectedFormFilters(prevState => [...prevState, newFilter])
		}
	}

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
						<section>
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
												onClick={() => selectFilter(filterItem.id, option.id)}
												checked={checkFilter(filterItem.id, option.id)}
											/>
										))}
									</div>
								</article>
							))}
						</section>
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
