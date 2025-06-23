import { FC, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DialogPanel } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'

import { FilterGroup, useFilterStore } from '@/entities/filter'
import { getFilters } from '@/shared/api/Filter'
import { FilterType, SearchRequestFilter } from '@/shared/api/types'
import { useModalStore } from '@/shared/model'
import { Button, CloseIcon, Loader, Modal, Title } from '@/shared/ui'
import { ConfirmModal } from '@/widgets/ConfirmModal'

import { FilterMap } from '../model'

export const FilterModal: FC = () => {
	const selectedFilters = useFilterStore(state => state.selectedFilters)
	const setSelectedFilters = useFilterStore(state => state.setSelectedFilters)
	const isOpen = useModalStore(state => state.modals['filter-modal'] || false)
	const openModal = useModalStore(state => state.openModal)
	const closeModal = useModalStore(state => state.closeModal)
	const closeAllModals = useModalStore(state => state.closeAllModals)
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

	const cancelChanges = useCallback(() => {
		closeAllModals()
		setFilterMap(convertToFilterMap(selectedFilters))
	}, [selectedFilters, closeAllModals, convertToFilterMap])

	const saveChanges = useCallback(() => {
		setSelectedFilters(convertToRequestFilter(filterMap))
		closeAllModals()
	}, [closeAllModals, filterMap, setSelectedFilters, convertToRequestFilter])

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

	const resetFilterMap = useCallback(() => {
		setFilterMap({})
	}, [])

	return (
		<Modal
			isOpen={isOpen}
			onClose={() => closeModal('filter-modal')}
			className="p-20"
		>
			<DialogPanel className="w-full space-y-4 rounded-2xl bg-white px-8 py-10">
				<ConfirmModal
					onCancel={cancelChanges}
					onConfirm={saveChanges}
				/>
				<header className="w-full h-12 grid grid-cols-[1fr_auto_1fr] items-center justify-items-end">
					<div />
					<Title id="filter-modal-title">{t('filter:filter')}</Title>
					<button
						className="cursor-pointer"
						onClick={() => closeModal('filter-modal')}
						aria-label={t('filter:close-filter-modal')}
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
							onClick={() => openModal('confirm-modal')}
						>
							{t('filter:apply')}
						</Button>
						<button
							onClick={resetFilterMap}
							className="font-medium text-base text-[#078691] underlined leading-none cursor-pointer"
						>
							{t('filter:clear-all-parameters')}
						</button>
					</footer>
				</section>
			</DialogPanel>
		</Modal>
	)
}
