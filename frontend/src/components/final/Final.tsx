import { useCallback } from 'react'

import { toast } from 'sonner'

import { FinalContent } from '@/components/final/final-content/FinalContent'
import { FinalFeedback } from '@/components/final/final-feedback/FinalFeedback'
import { FinalHistory } from '@/components/final/final-history/FinalHistory'
import { useGetInterview } from '@/components/room/hooks/useGetInterview'
import { GlobalLoader } from '@/components/ui/loader'

import styles from './Final.module.scss'

export function Final() {
	const { interview, isLoading } = useGetInterview()

	const handleCopy = useCallback(async (text: string) => {
		await navigator.clipboard.writeText(text)
		toast.success('Ссылка успешно скопирована в буфер обмена!')
	}, [])

	return isLoading || !interview.feedback ? (
		<GlobalLoader />
	) : (
		<div className={styles.final}>
			<div className='container'>
				<div className={styles.wrap}>
					<FinalContent interview={interview} handleCopy={handleCopy} />
					<div className={styles.line} />
					<FinalFeedback
						feedback={interview.feedback}
						handleCopy={handleCopy}
					/>
					<FinalHistory messages={interview.messages} />
				</div>
			</div>
		</div>
	)
}

/* если прошло уже около 15 вопросов на собеседовании (ослеживать кол-во найденных сообещний на nestjs backend), то стоит уже заканчивать собеседование. Это альтернатива таймеру. Нельзя доверять ИИ - она может хоть час вести собеседование, даже несмотря на то, что я постоянно прошу статус */
/* так же делаешь product langing с крутым SEO, с тарифами и пакетами. При нажатии на кнопку "купить" ссылка будет вести на страницу оплаты уже в react приложении - продуктовый лендинг будет вести на реакт, на реакте просто проще всего описать всю эту логику оплаты (подключение русский сервисов) */
