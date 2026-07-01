import { useCallback, useState } from 'react'

import cn from 'clsx'
import { ChevronDown } from 'lucide-react'

import type { ISelectProps } from '@/components/ui/select/select.type'
import { useOutside } from '@/hooks/useOutside'

import styles from './Select.module.scss'

export function Select(props: ISelectProps) {
	const { title, options, pickFn, error } = props

	const { ref, isShow, setIsShow } = useOutside<HTMLUListElement>(false)
	const [value, setValue] = useState(title)

	const onPick = useCallback(
		(value: string) => {
			setIsShow(false)
			pickFn(value)
			setValue(value)
		},
		[pickFn, setValue, setIsShow],
	)

	return (
		<div className={styles.select}>
			<div
				className={cn(styles.header, {
					[styles.hasError]: !!error,
				})}
			>
				{error && <div className={styles.error}>{error}</div>}
				<div className={styles.title} onClick={() => setIsShow(prev => !prev)}>
					{value}
					<ChevronDown
						className={cn(styles.icon, {
							[styles.active]: isShow,
						})}
					/>
				</div>
			</div>
			{isShow && (
				<ul className={styles.options} ref={ref}>
					{options.map(option => (
						<li
							key={option}
							className={cn(styles.option, {
								[styles.selected]: value === option,
							})}
							onClick={() => onPick(option)}
						>
							{option}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
