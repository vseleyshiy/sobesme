import styles from './Loader.module.scss'

export function ThinkingLoader() {
	return (
		<div className={styles.think}>
			<div className={styles.title}>думает</div>
			<div className={styles.dots}>
				<span className={styles.dot} />
				<span className={styles.dot} />
				<span className={styles.dot} />
			</div>
		</div>
	)
}
