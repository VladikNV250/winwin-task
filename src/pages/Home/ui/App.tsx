import { useState } from 'react'

import { FilterModal } from './FilterModal'

export const App = () => {
	const [isOpen, setIsOpen] = useState(true)
	return (
		<section className="w-full h-dvh flex items-center justify-center">
			{/* eslint-disable-next-line i18next/no-literal-string */}
			<h1 className="text-6xl text-gray-600 mb-12">
				WinWinTravel frontend test task
			</h1>
			<FilterModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
			/>
		</section>
	)
}
