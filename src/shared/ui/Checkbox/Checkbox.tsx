import { FC, InputHTMLAttributes } from 'react'

import clsx from 'clsx'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
	readonly label?: string
}

export const Checkbox: FC<CheckboxProps> = ({
	label,
	id,
	className,
	...props
}) => {
	return (
		<div className="inline-flex items-center user-select-none relative">
			<label
				htmlFor={id}
				className="flex items-center justify-center cursor-pointer relative"
			>
				<input
					type="checkbox"
					className="sr-only peer"
					id={id}
					readOnly
					{...props}
				/>
				<span
					className={clsx(
						'size-5 border-2 border-primary-text rounded-xs',
						'flex-shrink-0 flex-grow-0',
						'bg-no-repeat bg-center bg-[length:50%_50%]',
						'peer-checked:border-brand-500 peer-checked:bg-brand-500',
						`peer-checked:bg-[url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%208%208'%3e%3cpath%20fill='white'%20d='M6.564.75l-3.59%203.612-1.538-1.55L0%204.26%202.974%207.25%208%202.193z'/%3e%3c/svg%3e")]`,
						'peer-hover:border-brand-500/40',
						'peer-active:bg-brand-500/70',
						'peer-focus-visible:shadow-[0_0_0_3px_rgba(0,0,255,0.125)]',
						'peer-focus-visible:not(:checked):border-[#C3C3C3]',
						'peer-disabled:bg-black',
						'transition-all duration-150',
						className
					)}
				/>
				{label && (
					<span className="font-normal text-base leading-none text-primary-text ml-4.5">
						{label}
					</span>
				)}
			</label>
		</div>
	)
}
