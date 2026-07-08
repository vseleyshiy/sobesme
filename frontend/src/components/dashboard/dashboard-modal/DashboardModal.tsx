import { useForm, type SubmitHandler } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { DashboardModalButtons } from '@/components/dashboard/dashboard-modal/dashboard-modal-buttons/DashboardModalButtons'
import { DashboardModalFields } from '@/components/dashboard/dashboard-modal/dashboard-modal-fields/DashboardModalFields'
import type { IDashboardModalProps } from '@/components/dashboard/dashboard-modal/dashboard-modal.type'
import {
	interviewStartSchema,
	type TypeInterviewStartSchema,
} from '@/components/dashboard/dashboard-modal/schemas/interview-start.schema'
import { useStartInterview } from '@/components/dashboard/hooks/useStartInterview'
import { Modal } from '@/components/modal/Modal'
import styles from '@/components/modal/Modal.module.scss'

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

	return (
		<Modal ref={ref} isShow={isShow} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.info}>
				<div className={styles.header}>
					<div className={styles.title}>Настройка нового собеседования</div>
					<div className={styles.description}>
						Выберите тему и уровень, на который планируете собеседоваться
					</div>
				</div>
				<DashboardModalFields
					register={register}
					control={control}
					errors={errors}
				/>
			</div>
			<DashboardModalButtons setIsShow={setIsShow} isPending={isPending} />
		</Modal>
	)
}
