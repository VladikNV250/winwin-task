import { FilterItem } from '../types/Filter'

export const getFilters = async (): Promise<{ filterItems: FilterItem[] }> => {
	await new Promise(resolve => setTimeout(resolve, 300))
	const response = await fetch('/filterData.json')
	if (!response.ok) {
		throw new Error("Coudn't get a filters.")
	}
	return response.json()
}
