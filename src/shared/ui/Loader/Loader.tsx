import { FC } from 'react'

interface LoaderProps {
	readonly loading?: boolean
}

export const Loader: FC<LoaderProps> = ({ loading = true }) => {
	if (!loading) {
		return null
	}

	return (
		<div
			className={`
				size-12 border-5 border-primary-text 
				border-b-brand-500 rounded-full animate-spin 
			`}
		/>
	)
}
