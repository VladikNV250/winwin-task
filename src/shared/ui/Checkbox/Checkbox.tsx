import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export interface ICheckbox extends React.InputHTMLAttributes<HTMLInputElement> {
	readonly label?: string
}

export const Checkbox: FC<ICheckbox> = ({ label, id, className, ...props }) => {
	const { t } = useTranslation()

	return (
		<label className="inline-flex items-center user-select-none cursor-pointer relative">
			<input
				type="checkbox"
				className="sr-only peer"
				id={id}
				{...props}
			/>
			<span
				className={`
					size-5 mr-4.5 border-2 border-[#31393C] rounded-xs
					flex-shrink-0 flex-grow-0
					bg-no-repeat bg-center bg-[length:50%_50%]
					peer-checked:border-[#FF5F00] peer-checked:bg-[#FF5F00]
					peer-checked:bg-[url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%208%208'%3e%3cpath%20fill='white'%20d='M6.564.75l-3.59%203.612-1.538-1.55L0%204.26%202.974%207.25%208%202.193z'/%3e%3c/svg%3e")]
					peer-hover:border-[#FF5F00]/40
					peer-active:bg-[#FF5F00]/70
					peer-focus-visible:shadow-[0_0_0_3px_rgba(0,0,255,0.125)]
					peer-focus-visible:not(:checked):border-[#c3c3c3]
					peer-disabled:bg-black
					transition-all duration-150 ${className}
				`}
			/>
			{label && (
				<span className="font-normal text-base leading-none text-[#31393C]">
					{t(label)}
				</span>
			)}
		</label>
	)
}
