import { FC } from 'react'

interface ILoader {
	readonly loading?: boolean
}

export const Loader: FC<ILoader> = ({ loading = true }) => {
	return (
		<div
			className={`
				size-12 border-5 border-primary-text 
				border-b-brand-500 rounded-full animate-spin 
				${loading ? 'block' : 'hidden'}
			`}
		/>
	)
}
