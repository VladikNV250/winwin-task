import { SearchRequestFilter } from '@/shared/api/types'

export interface FilterStore {
	selectedFilters: SearchRequestFilter
	setFilters: (filters: SearchRequestFilter) => void
}
