import { FC, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useQuery } from '@tanstack/react-query'

import { FilterGroup, useFilterStore } from '@/entities/filter'
import { getFilters } from '@/shared/api/Filter'
import { FilterType, SearchRequestFilter } from '@/shared/api/types'
import { Button, CloseIcon, Loader, Modal, Title } from '@/shared/ui'
import { ConfirmModal } from '@/widgets/ConfirmModal'

import { FilterMap } from '../model'

interface IFilterModal {
	readonly isOpen: boolean
	readonly onClose: () => void
}

export const FilterModal: FC<IFilterModal> = ({ isOpen, onClose }) => {
	const selectedFilters = useFilterStore(state => state.selectedFilters)
	const setSelectedFilters = useFilterStore(state => state.setSelectedFilters)
	const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
	const [filterMap, setFilterMap] = useState<FilterMap>({})
	const { t } = useTranslation()
	const { data, isLoading } = useQuery({
		queryKey: ['filters'],
		queryFn: getFilters
	})

	const convertToFilterMap = useCallback(
		(selectedFilters: SearchRequestFilter): FilterMap => {
			const filterMap: FilterMap = {}

			selectedFilters.forEach(filter => {
				filterMap[filter.id] = new Set()
				filter.optionsIds.forEach(option => {
					filterMap[filter.id].add(option)
				})
			})

			return filterMap
		},
		[]
	)

	useEffect(() => {
		if (isOpen) {
			setFilterMap(convertToFilterMap(selectedFilters))
		}
	}, [selectedFilters, isOpen, convertToFilterMap])

	const convertToRequestFilter = useCallback(
		(filterMap: FilterMap): SearchRequestFilter =>
			Object.entries(filterMap).map(([id, optionsIds]) => ({
				id,
				type: FilterType.OPTION,
				optionsIds: Array.from(optionsIds)
			})),
		[]
	)

	const closeConfirmModal = useCallback(() => setIsOpenConfirmModal(false), [])
	const openConfirmModal = useCallback(() => setIsOpenConfirmModal(true), [])
	const closeModals = useCallback(() => {
		onClose()
		closeConfirmModal()
		setFilterMap(convertToFilterMap(selectedFilters))
	}, [selectedFilters, closeConfirmModal, onClose, convertToFilterMap])

	const saveChanges = useCallback(() => {
		setSelectedFilters(convertToRequestFilter(filterMap))
		closeModals()
	}, [closeModals, filterMap, setSelectedFilters, convertToRequestFilter])

	const checkOption = useCallback(
		(filterId: string, optionId: string): boolean =>
			filterMap[filterId]?.has(optionId) ?? false,
		[filterMap]
	)

	const toggleOption = useCallback((filterId: string, optionId: string) => {
		setFilterMap(prev => {
			const next = { ...prev }

			const currentSet = next[filterId]
				? new Set(next[filterId])
				: new Set<string>()

			if (currentSet.has(optionId)) {
				currentSet.delete(optionId)
				if (currentSet.size === 0) {
					delete next[filterId]
				} else {
					next[filterId] = currentSet
				}
			} else {
				currentSet.add(optionId)
				next[filterId] = currentSet
			}

			return next
		})
	}, [])

	return (
		<Modal
			isOpen={isOpen}
			titleId="filter-modal-title"
			className={isOpenConfirmModal ? 'backdrop-blur-none! p-20' : 'p-20'}
		>
			<ConfirmModal
				isOpen={isOpenConfirmModal}
				onClose={closeConfirmModal}
				onCancel={closeModals}
				onConfirm={saveChanges}
			/>
			<section className="size-full bg-white rounded-2xl px-8 py-10">
				<header className="w-full h-12 grid grid-cols-[1fr_auto_1fr] items-center justify-items-end">
					<div />
					<Title id="filter-modal-title">{t('Filter')}</Title>
					<button
						className="cursor-pointer"
						onClick={onClose}
						aria-label={t('Close filter modal')}
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
							<FilterGroup
								key={filterItem.id}
								filterItem={filterItem}
								onSelect={toggleOption}
								checkOption={checkOption}
							/>
						))}
					</section>
				)}
				<section>
					<hr className="border-t-0 h-0.5 bg-secondary-text rounded-xs mt-6 mb-8" />
					<footer className="w-full grid grid-cols-[1fr_auto_1fr] items-center justify-items-end">
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
					</footer>
				</section>
			</section>
		</Modal>
	)
}
