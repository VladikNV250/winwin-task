import { create } from 'zustand'

import { FilterStore } from './types'

export const useFilterStore = create<FilterStore>(set => ({
	selectedFilters: [],
	setSelectedFilters: filters => set(() => ({ selectedFilters: filters }))
}))
