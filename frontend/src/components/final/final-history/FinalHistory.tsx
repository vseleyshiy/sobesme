import type { IFinalHistoryProps } from '@/components/final/final-history/final-history.type'
import { Message } from '@/components/final/message/Message'

import styles from '../Final.module.scss'

export function FinalHistory(props: IFinalHistoryProps) {
	const { messages } = props

	return (
		<div className={styles.section}>
			<div className={styles.title}>итоговый диалог</div>
			<div className={styles.list}>
				{messages
					.sort(
						(a, b) =>
							new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
					)
					.map(message => (
						<Message key={message.id} message={message} />
					))}
			</div>
		</div>
	)
}
