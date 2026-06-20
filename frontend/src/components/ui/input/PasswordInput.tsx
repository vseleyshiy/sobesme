import { useState } from 'react'

import { Eye, EyeOff } from 'lucide-react'

import { Input } from './Input'
import styles from './Input.module.scss'
import type { IInputProps } from './input.types'

export function PasswordInput<T>(props: IInputProps<T>) {
	const [isHide, setIsHide] = useState(true)

	return (
		<Input
			{...props}
			args={{
				type: isHide ? 'password' : 'text',
				placeholder: props.args.placeholder,
			}}
		>
			<div className={styles.eye} onClick={() => setIsHide(prev => !prev)}>
				{isHide ? <EyeOff /> : <Eye />}
			</div>
		</Input>
	)
}
