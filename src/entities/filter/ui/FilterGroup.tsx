import { FC } from 'react'

import clsx from 'clsx'

import { FilterItem } from '@/shared/api/types'
import { Checkbox, Subtitle } from '@/shared/ui'

interface FilterGroupProps {
	filterItem: FilterItem
	checkOption: (filterId: string, optionId: string) => boolean
	onSelect: (filterId: string, optionId: string) => void
}

export const FilterGroup: FC<FilterGroupProps> = ({
	filterItem,
	checkOption,
	onSelect
}) => {
	return (
		<section>
			<hr className="border-t-0 h-0.5 bg-secondary-text rounded-xs mt-6 mb-8" />
			<Subtitle
				id={`filter-group-${filterItem.id}-title`}
				className="mb-6"
			>
				{filterItem.name}
			</Subtitle>
			<div
				role="group"
				aria-labelledby={`filter-group-${filterItem.id}-title`}
				className={clsx('grid gap-y-5', {
					'grid-cols-1': filterItem.options.length < 3,
					'grid-cols-2': filterItem.options.length === 4,
					'grid-cols-3':
						filterItem.options.length > 4 || filterItem.options.length === 3
				})}
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
