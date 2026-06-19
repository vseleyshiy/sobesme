import { Eye, EyeOff } from 'lucide-react'

import styles from './Input.module.scss'
import type { IInputProps } from './input.types'

export function Input(props: IInputProps) {
	const { title, args, style, isPassword, isHidePassword, setIsHidePassword } =
		props

	return (
		<div className={styles.row}>
			<span className={styles.title}>{title}</span>
			<div className={styles.input}>
				<input
					type={isPassword ? (isHidePassword ? 'password' : 'text') : args.type}
					style={style}
					{...args}
				/>
				{isPassword && (
					<div
						className={styles.eye}
						onClick={() => setIsHidePassword(prev => !prev)}
					>
						{isHidePassword ? <EyeOff /> : <Eye />}
					</div>
				)}
			</div>
		</div>
	)
}
