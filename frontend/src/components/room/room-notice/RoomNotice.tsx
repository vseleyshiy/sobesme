import { useState } from 'react'

import { Modal } from '@/components/modal/Modal'
import styles from '@/components/modal/Modal.module.scss'
import { Button } from '@/components/ui/button'

export function RoomNotice() {
	const [notice, setNotice] = useState(true)
	return (
		<Modal isShow={notice}>
			<div className={styles.info}>
				<div className={styles.header}>
					<div className={styles.title}>Поприветствуйте собеседника!</div>
					<div className={styles.description}>
						<ul>
							<li>Поприветствуйте собеседника, включив микрофон.</li>
							<li>
								Затем выключите микрофон. Делайте так каждый раз, когда
								закончили свою мысль.
							</li>
							<li>Вскоре после этого начнётся собеседование.</li>
						</ul>
						<br />
						Удачи!
					</div>
				</div>
			</div>
			<div className={styles.buttons}>
				<Button
					args={{
						onClick: e => {
							e.preventDefault()

							setNotice(false)
						},
					}}
				>
					понял, принял
				</Button>
			</div>
		</Modal>
	)
}
