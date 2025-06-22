import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/shared/ui'
import { FilterModal } from '@/widgets'

export const App = () => {
	const { t } = useTranslation()
	const [isOpenFilterModal, setIsOpenFilterModal] = useState(false)

	return (
		<section className="relative w-full h-dvh flex items-center justify-center">
			<div className="flex flex-col items-center">
				{/* eslint-disable-next-line i18next/no-literal-string */}
				<h1 className="text-6xl text-gray-600 mb-12">
					WinWinTravel frontend test task
				</h1>
				<Button onClick={() => setIsOpenFilterModal(true)}>
					{t('Open Filters')}
				</Button>
			</div>
			<FilterModal
				isOpen={isOpenFilterModal}
				onClose={() => setIsOpenFilterModal(false)}
			/>
		</section>
	)
}
