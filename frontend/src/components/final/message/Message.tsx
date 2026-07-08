import cn from 'clsx'
import { Heart } from 'lucide-react'

import type { IMessageProps } from '@/components/final/message/message.type'

import styles from './Message.module.scss'

export function Message(props: IMessageProps) {
	const { message } = props

	return (
		<div
			className={cn(styles.message, {
				[styles.ai]: message.role === 'assistant',
			})}
		>
			<div className={styles.wrap}>
				<div className={styles.role}>
					{message.role}
					{message.currentHp && (
						<div className={styles.hp}>
							{message.currentHp}
							<Heart />
						</div>
					)}
				</div>
				<div className={styles.content}>{message.content}</div>
			</div>
		</div>
	)
}
