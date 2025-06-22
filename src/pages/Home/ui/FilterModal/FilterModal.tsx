import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { useQuery } from '@tanstack/react-query'

import { getFilters } from '@/shared/api/Filter'
import {
	Checkbox,
	CloseIcon,
	Loader,
	Modal,
	Subtitle,
	Title
} from '@/shared/ui'

interface IFilterModal {
	readonly isOpen: boolean
	readonly onClose: () => void
}

export const FilterModal: FC<IFilterModal> = ({ isOpen, onClose }) => {
	const { t } = useTranslation()
	const { data, isLoading } = useQuery({
		queryKey: ['filters'],
		queryFn: getFilters
	})

	return (
		<Modal isOpen={isOpen}>
			<div className="size-full p-20">
				<section className="size-full bg-white rounded-2xl px-8 py-10">
					<header className="w-full h-12 flex items-center justify-between">
						<div className="w-6" />
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
				</section>
			</div>
		</Modal>
	)
}
