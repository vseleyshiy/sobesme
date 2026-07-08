import { useCallback, useState, type ReactNode } from 'react'

import cn from 'clsx'
import { ChevronDown, Info } from 'lucide-react'

import type { ISelectProps } from '@/components/ui/select/select.type'
import { Tooltip } from '@/components/ui/tooltip'
import { useOutside } from '@/hooks/useOutside'

import styles from './Select.module.scss'

export function Select<T extends ReactNode & React.Key = string>(
	props: ISelectProps<T>,
) {
	const { title, options, pickFn, error, style } = props

	const { ref, isShow, setIsShow } = useOutside<HTMLUListElement>(false)
	const [value, setValue] = useState<T | string>(title)

	const onPick = useCallback(
		(value: T) => {
			setIsShow(false)
			pickFn(value)
			setValue(value)
		},
		[pickFn, setValue, setIsShow],
	)

	return (
		<div className={styles.select} style={style}>
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
							key={option.text}
							className={cn(styles.option, {
								[styles.selected]: value === option.text,
							})}
							onClick={() => onPick(option.text)}
						>
							{option.text}
							{option.info && (
								<Tooltip text={option.info} placement='right'>
									<Info size={15} />
								</Tooltip>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
