import styles from './Input.module.scss'
import type { IInputProps } from './input.types'

export function Input<T>(props: IInputProps<T>) {
	const { children, title, name, error, args, style, register } = props

	return (
		<div className={styles.row}>
			<div className={styles.rowHead}>
				<span className={styles.title}>{title}</span>
				{error && <span className={styles.error}>{error}</span>}
			</div>
			<div
				className={styles.input}
				style={
					error && {
						border: '1px solid var(--text-danger)',
					}
				}
			>
				<input
					{...args}
					{...(register && name ? register(name) : {})}
					style={style}
				/>
				{children}
			</div>
		</div>
	)
}
