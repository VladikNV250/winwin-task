import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { FilterItem } from '@/shared/api/types'
import { Checkbox, Subtitle } from '@/shared/ui'

interface IFilterGroup {
	filterItem: FilterItem
	checkOption: (filterId: string, optionId: string) => boolean
	onSelect: (filterId: string, optionId: string) => void
}

export const FilterGroup: FC<IFilterGroup> = ({
	filterItem,
	checkOption,
	onSelect
}) => {
	const { t } = useTranslation()

	const getGridColumns = (countOfOptions: number): string => {
		if (countOfOptions <= 2) {
			return 'grid-cols-1'
		} else if (countOfOptions === 4) {
			return 'grid-cols-2'
		}

		return 'grid-cols-3'
	}

	return (
		<section>
			<hr className="border-t-0 h-0.5 bg-secondary-text rounded-xs mt-6 mb-8" />
			<Subtitle
				id={`filter-group-${filterItem.id}-title`}
				className="mb-6"
			>
				{t(filterItem.name)}
			</Subtitle>
			<div
				role="group"
				aria-labelledby={`filter-group-${filterItem.id}-title`}
				className={`grid gap-y-5 ${getGridColumns(filterItem.options.length)}`}
			>
				{filterItem.options.map(option => (
					<Checkbox
						key={option.id}
						id={option.id}
						label={option.name}
						onClick={() => onSelect(filterItem.id, option.id)}
						checked={checkOption(filterItem.id, option.id)}
					/>
				))}
			</div>
		</section>
	)
}
