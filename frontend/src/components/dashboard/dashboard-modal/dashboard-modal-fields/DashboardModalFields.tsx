import { Controller } from 'react-hook-form'

import type { IDashboardModalFieldsProps } from '@/components/dashboard/dashboard-modal/dashboard-modal-fields/dashboard-modal-fields.type'
import {
	DASHBOARD_MODAL_DIFFICULTIES,
	DASHBOARD_MODAL_GRADES,
} from '@/components/dashboard/dashboard-modal/dashboard-modal.data'
import styles from '@/components/modal/Modal.module.scss'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import type { TypeDifficulty } from '@/types/enums.type'

export function DashboardModalFields(props: IDashboardModalFieldsProps) {
	const { register, control, errors } = props

	return (
		<div className={styles.fields}>
			<Input
				title='тема'
				name='topic'
				args={{
					placeholder: 'frontend разработка на React...',
				}}
				register={register}
				error={errors.topic?.message}
				classNames={[styles.input]}
			/>
			<div className={styles.selects}>
				<Controller
					name='difficulty'
					control={control}
					render={({ field: { onChange }, fieldState: { error } }) => (
						<Select<TypeDifficulty>
							title='выбери сложность'
							options={DASHBOARD_MODAL_DIFFICULTIES}
							pickFn={onChange}
							error={error?.message}
						/>
					)}
				/>
				<Controller
					name='grade'
					control={control}
					render={({ field: { onChange }, fieldState: { error } }) => (
						<Select
							title='выбери грейд'
							options={DASHBOARD_MODAL_GRADES}
							pickFn={onChange}
							error={error?.message}
						/>
					)}
				/>
			</div>
		</div>
	)
}
