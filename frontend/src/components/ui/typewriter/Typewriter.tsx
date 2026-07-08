import { useEffect, useState } from 'react'

import cn from 'clsx'

import type { ITypewriterProps } from '@/components/ui/typewriter/typewriter.type'

import styles from './Typewriter.module.scss'

export function Typewriter(props: ITypewriterProps) {
	const { text, classNames, speed = 30, onComplete, ref } = props

	const [displayedText, setDisplayedText] = useState('')

	useEffect(() => {
		let currentIndex = 0
		let currentString = ''

		const timer = setInterval(() => {
			if (currentIndex < text.length) {
				currentString += text.charAt(currentIndex)
				setDisplayedText(currentString)
				currentIndex++
			} else {
				clearInterval(timer)
				if (onComplete) onComplete()
			}
		}, speed)

		return () => clearInterval(timer)
	}, [text, speed, onComplete])

	return (
		<div className={cn(styles.container, classNames)} ref={ref}>
			{displayedText}
			<span className={styles.cursor}>|</span>
		</div>
	)
}
