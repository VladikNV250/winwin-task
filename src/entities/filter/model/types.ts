import { SearchRequestFilter } from '@/shared/api/types'

export interface FilterStore {
	selectedFilters: SearchRequestFilter
	setSelectedFilters: (filters: SearchRequestFilter) => void
}
