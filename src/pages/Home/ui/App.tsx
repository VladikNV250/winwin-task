import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

import { useFilterStore } from '@/entities/filter'
import { useModalStore } from '@/shared/model'
import { Button } from '@/shared/ui'
import { FilterModal } from '@/widgets'

export const App = () => {
	const { t } = useTranslation()
	const openModal = useModalStore(state => state.openModal)
	const selectedFilters = useFilterStore(state => state.selectedFilters)

	return (
		<main className="relative w-full h-dvh flex items-center justify-center">
			<div className="flex flex-col items-center">
				{/* eslint-disable-next-line i18next/no-literal-string */}
				<h1 className="text-6xl text-gray-600 mb-12">
					WinWinTravel frontend test task
				</h1>
				<Button onClick={() => openModal('filter-modal')}>
					{t('filter:open-filters')}
				</Button>
				<section>
					{selectedFilters.map(item => (
						<p key={item.id}>
							{t('filter:filter-id')}: {item.id} | {t('filter:options')}:
							{item.optionsIds.map(item => (
								<Fragment key={item}>{item}, </Fragment>
							))}
						</p>
					))}
				</section>
			</div>
			<FilterModal />
		</main>
	)
}
