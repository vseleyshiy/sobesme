import { Input, PasswordInput } from '../../../ui/input'
import type { IInputProps } from '../../../ui/input/input.types'
import styles from './AuthFields.module.scss'
import type { IAuthFieldsProps } from './auth-fields.types'

export function AuthFields<T>(props: IAuthFieldsProps<T>) {
	const { fields, register, errors } = props

	return (
		<div className={styles.fields}>
			{fields.map(field => {
				const inputProps: IInputProps<T> = {
					name: field.name,
					register,
					title: field.title,
					args: {
						placeholder: field.placeholder,
					},
					error: errors[field.name]?.message as string,
				}
				if (field.isPassword) {
					return <PasswordInput<T> key={field.name} {...inputProps} />
				} else {
					return <Input<T> key={field.name} {...inputProps} />
				}
			})}
		</div>
	)
}
