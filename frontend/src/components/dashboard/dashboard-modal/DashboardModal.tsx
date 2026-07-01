import { useCallback } from 'react'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { DASHBOARD_MODAL_GRADES } from '@/components/dashboard/dashboard-modal/dashboard-modal.data'
import type { IDashboardModalProps } from '@/components/dashboard/dashboard-modal/dashboard-modal.type'
import {
	interviewStartSchema,
	type TypeInterviewStartSchema,
} from '@/components/dashboard/dashboard-modal/schemas/interview-start.schema'
import { useStartInterview } from '@/components/dashboard/hooks/useStartInterview'
import { Modal } from '@/components/modal/Modal'
import styles from '@/components/modal/Modal.module.scss'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

export function DashboardModal(props: IDashboardModalProps) {
	const { isShow, setIsShow, ref } = props

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<TypeInterviewStartSchema>({
		resolver: zodResolver(interviewStartSchema),
	})

	const { mutate, isPending } = useStartInterview()

	const onSubmit: SubmitHandler<TypeInterviewStartSchema> = (
		data: TypeInterviewStartSchema,
	) => {
		mutate(data)
	}

	const handleClose = useCallback(() => setIsShow(false), [setIsShow])

	return (
		<Modal ref={ref} isShow={isShow} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.info}>
				<div className={styles.header}>
					<div className={styles.title}>Настройка нового собеседования</div>
					<div className={styles.description}>
						Выберите тему и уровень, на который планируете собеседоваться
					</div>
				</div>
				<div className={styles.fields}>
					<Controller
						name='grade'
						control={control}
						render={({ field: { onChange }, fieldState: { error } }) => (
							<Select
								title='выбери сложность'
								options={DASHBOARD_MODAL_GRADES}
								pickFn={onChange}
								error={error?.message}
							/>
						)}
					/>
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
				</div>
			</div>
			<div className={styles.buttons}>
				<Button
					args={{
						onClick: handleClose,
						disabled: isPending,
					}}
				>
					закрыть
				</Button>
				<Button
					classNames={[styles.mainBtn]}
					args={{
						disabled: isPending,
					}}
				>
					В БОЙ!
				</Button>
			</div>
		</Modal>
	)
}
