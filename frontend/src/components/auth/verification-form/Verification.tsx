import { useEffect, useRef } from 'react'

import { Loader } from '../../ui/loader'
import { useVerification } from '../hooks/useVerification'
import styles from './Verification.module.scss'

export function Verification() {
	const { mutate } = useVerification()

	const hasRequested = useRef(false)

	useEffect(() => {
		if (hasRequested.current) return

		hasRequested.current = true
		mutate()
	}, [mutate])

	return (
		<div className={styles.wrap}>
			<div className={styles.content}>
				<h1>Подтверждение почты</h1>
				Через несколько секунд вы будете перенаправлены в свой профиль
				<Loader />
			</div>
		</div>
	)
}
