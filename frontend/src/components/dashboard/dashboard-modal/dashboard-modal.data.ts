import type { ISelectOption } from '@/components/ui/select/select.type'
import type { TypeDifficulty, TypeGrade } from '@/types/enums.type'

export const DASHBOARD_MODAL_GRADES: ISelectOption<TypeGrade>[] = [
	{
		text: 'TRAINEE',
	},
	{
		text: 'JUNIOR',
	},
	{
		text: 'MIDDLE',
	},
	{
		text: 'SENIOR',
	},
]

export const DASHBOARD_MODAL_DIFFICULTIES: ISelectOption<TypeDifficulty>[] = [
	{
		text: 'PUPPY',
		info: 'мягкое общение без давления',
	},
	{
		text: 'STRICT',
		info: 'сухо, профессионально и по делу',
	},
	{
		text: 'HARD',
		info: 'жёстко, коротко, придирчиво и рублено',
	},
]
