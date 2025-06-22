import { create } from 'zustand'

import { FilterStore } from './types'

export const useFilterStore = create<FilterStore>(set => ({
	selectedFilters: [],
	setFilters: filters => set(() => ({ selectedFilters: filters }))
}))
